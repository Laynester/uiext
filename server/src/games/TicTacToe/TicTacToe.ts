import { Lang } from "../../lang/Lang";
import { UIExt } from "../../main";
import { GameWindowComposer } from "../../networking/outgoing/games/GameWindowComposer";
import { TicTacToeGameBoardComposer } from "../../networking/outgoing/games/TicTacToe/TicTacToeGameBoardComposer";
import { AlertComposer } from "../../networking/outgoing/general/AlertComposer";
import { RCON } from "../../utils/RCON";
import { WsUser } from "../../utils/WsUser";
import { Games } from "../Games";

export class TicTacToe extends Games
{
    private _gameBoard: Array<Array<string>>;

    private _turn: string = "o";

    constructor(host: number, secondary: number)
    {
        super(host, secondary,"ttt");

        this._gameBoard = [];

        this.setBoard();

        this.host.sendMessage(new TicTacToeGameBoardComposer(this._gameBoard, this._turn, "o"));

        this.secondary.sendMessage(new TicTacToeGameBoardComposer(this._gameBoard, this._turn, "x"));
    }

    private setBoard(): void
    {
        let size: number = UIExt.getInstance().config.games.ttt.size;

        for (let i: number = 0; i < size; i++)
        {
            const row = [];

            for (let i: number = 0; i < size; i++)
            {
                row.push("");
            }

            this._gameBoard.push(row)
        }
    }

    public moveOnCell(row: number, column: number,type: string): void
    {
        if (!this._gameBoard) return;
        
        if (this._gameBoard[row][column] !== "") return;

        if (type !== this._turn) return;
     
        this._gameBoard[row][column] = type;

        this.checkWin(type);

        this._turn = this._turn == "o" ? "x" : "o";

        this.host.sendMessage(new TicTacToeGameBoardComposer(this._gameBoard, this._turn, "o"));

        this.secondary.sendMessage(new TicTacToeGameBoardComposer(this._gameBoard, this._turn, "x"));
    }

    private checkWin(type: string): void
    {
        if (!this._gameBoard) return;

        let size: number = UIExt.getInstance().config.games.ttt.size;

        let max: number = UIExt.getInstance().config.games.ttt.max;

        let rows:number = 0;

        //rows
        for (let i: number = 0; i < size; i++)
        {
            rows = 0;
            for (let c: number = 0; c < size; c++)
            {
                if(type == this._gameBoard[i][c]) rows++;
                if(rows == max) return this.playerWon(type)
            }
        }

        let cols = [];

        //cols
        for (let i: number = 0; i < size; i++)
        {
            for (let c: number = 0; c < size; c++)
            {
                if (!cols[c]) cols[c] = 0;
                if(type == this._gameBoard[i][c]) cols[c]++;
                if(cols[c] == max) return this.playerWon(type)
            }
        }

        let diag: number = 0;

        // top left - bottom right
        for (let r: number = 0; r < size; r++)
        {
            for (let c: number = 0; c < size; c++)
            {
                if (this._gameBoard[r][c + diag] == "") break;

                if (type == this._gameBoard[r][c + diag]) diag++;

                if (diag == max) return this.playerWon(type);
            }
        }
        

        diag = 0;


        // top right - bottom left
        for (let r: number = 0; r < size; r++)
        {
            if (type == this._gameBoard[r][size - 1 - diag]) diag++;

            if (diag == max) return this.playerWon(type);
        }

        diag = 0;

        // bottom left - top right
        for (let r: number = (size - 1); r >= 0; r--)
        {
            if (type == this._gameBoard[r][diag]) diag++;

            if (diag == max) return this.playerWon(type);
        }

        diag = 0;

        // bottom left - top right
        for (let r: number = (size - 1); r >= 0; r--)
        {
            if (type == this._gameBoard[r][size - 1 - diag]) diag++;

            if (diag == max) return this.playerWon(type);
        }
        
    }

    private playerWon(type: string)
    {
        let winner: WsUser = null;
        let loser: WsUser = null;

        if (type == "x")
        {
            winner = this.secondary;
            loser = this.host;
        } else
        {
            winner = this.host;
            loser = this.secondary;
        }

        winner.sendMessage(new AlertComposer(3, Lang("games.ttt.window.won").replace("%currency%", this.givePrize(this.secondary)), "game.ttt"))
        loser.sendMessage(new AlertComposer(3, Lang("games.ttt.window.lost"), "game.ttt"))

        this.sendToPlayers(new GameWindowComposer("ttt", true, false));
        this.endGame();
        
        RCON.talkUser(winner.account.id, Lang("games.won_game")
            .replace("%user%", winner.account.username)
            .replace("%user2%", loser.account.username), "talk")
    }

    private givePrize(player: WsUser): string
    {
        let currencyString: string = "";

        if (UIExt.getInstance().config.games.ttt.givePrize)
        {
            UIExt.getInstance().config.games.ttt.prize.split(",").forEach((cost:string) =>
            {
                let currency: string[] = cost.split(":");
    
                if (currency.length < 2) return;
    
                switch (currency[0])
                {
                    case "-1":
                        currencyString += `${currency[1]} Credits `
                        RCON.giveCredits(player.account.id, parseInt(currency[1]));
                        break;
                    default:
                        switch (currency[0])
                        {
                            case "5":
                                currencyString += `${currency[1]} ${Lang("diamonds")} `;
                                break;
                            case "0":
                                currencyString += `${currency[1]} ${Lang("duckets")} `;
                                break;
                        }
                        RCON.givePoints(player.account.id, parseInt(currency[0]), -parseInt(currency[1]))
                }
            });   
        }

        return currencyString
    }

}