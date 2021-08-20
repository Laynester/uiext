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

        let vars: number[] = this.checkWin();

        if (vars !== null) return this.announceWin(vars);

        this._turn = this._turn == "o" ? "x" : "o";

        this.host.sendMessage(new TicTacToeGameBoardComposer(this._gameBoard, this._turn, "o"));

        this.secondary.sendMessage(new TicTacToeGameBoardComposer(this._gameBoard, this._turn, "x"));
    }

    private checkWin(): any[]
    {
        if (!this._gameBoard) return null;

        let size: number = UIExt.getInstance().config.games.ttt.size;

        let num_in_row: number = UIExt.getInstance().config.games.ttt.max

        let winningCoords: Array<Array<number>> = [];

        // rows
        for (let r: number = 0; r < size; r++)
        {
            for (let c: number = 0; c < size; c++)
            {
                let letter: string = this._gameBoard[r][c];

                winningCoords = [];

                if (letter == "") continue;

                for (let k: number = 0; k < num_in_row; k++)
                {
                    if ((c + k) >= num_in_row) continue;

                    let newLetter: string = this._gameBoard[r][c + k];

                    if (newLetter !== "" && newLetter == letter)
                    {
                        winningCoords.push([r, c + k]);
                        letter = newLetter;

                        if(winningCoords.length >= num_in_row) return [letter, winningCoords]
                    } else
                    {
                        winningCoords = [];
                    }
                }
            }
        }

        // columns
        for (let r: number = 0; r < size; r++)
        {
            for (let c: number = 0; c < size; c++)
            {
                let letter: string = this._gameBoard[r][c];

                winningCoords = [];

                if (letter == "") continue;

                for (let k: number = 0; k < num_in_row; k++)
                {
                    if ((r + k) >= num_in_row) continue

                    let newLetter: string = this._gameBoard[r + k][c];

                    if (newLetter !== "" && newLetter == letter)
                    {
                        winningCoords.push([r + k, c]);
                        letter = newLetter;

                        if(winningCoords.length >= num_in_row) return [letter, winningCoords]
                    } else
                    {
                        winningCoords = [];
                    }
                }
            }
        }

        // top left bottom right
        for (let r: number = 0; r < size; r++)
        {
            for (let c: number = 0; c < size; c++)
            {
                let letter: string = this._gameBoard[r][c];

                winningCoords = [];

                if (letter == "") continue;

                for (let k: number = 0; k < num_in_row; k++)
                {
                    if ((r + k) >= num_in_row || (r + k) >= num_in_row) continue

                    let newLetter: string = this._gameBoard[r + k][c + k];

                    if (newLetter !== "" && newLetter == letter)
                    {
                        winningCoords.push([r + k, c + k]);
                        letter = newLetter;

                        if(winningCoords.length >= num_in_row) return [letter, winningCoords]
                    } else
                    {
                        winningCoords = [];
                    }
                }
            }
        }

        // top right bottom left
        for (let r: number = 0; r < size; r++)
        {
            for (let c: number = 0; c < size; c++)
            {
                let letter: string = this._gameBoard[r][c];

                winningCoords = [];

                if (letter == "") continue;

                for (let k: number = 0; k < num_in_row; k++)
                {
                    let newX: number = r - k;
                    let newY: number = c + k;

                    if (newX < 0) continue;

                    if (newX >= num_in_row || newY >= num_in_row) continue;

                    let newLetter: string = this._gameBoard[newX][newY];

                    if (newLetter !== "" && newLetter == letter)
                    {
                        winningCoords.push([newX, newY]);
                        letter = newLetter;

                        if (winningCoords.length >= num_in_row) return [letter, winningCoords]
                    } else
                    {
                        winningCoords = [];
                    }
                }
            }
        }

        // check faulty 
        let gameSize: number = size * 2;
        let done: number = 0;

        for (let r: number = 0; r < size; r++)
        {
            for (let c: number = 0; c < size; c++)
            {
                if (this._gameBoard[r][c] !== "") done++;
                if (done == gameSize) this.failedGame();
                return null;
            }
        }

        return null;
    }

    private announceWin(variables: any[]): void
    {
        this.playerWon(variables[0])
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

        this.endGame();
        
        RCON.talkUser(winner.account.id, Lang("games.won_game")
            .replace("%user%", winner.account.username)
            .replace("%user2%", loser.account.username), "talk")
    }

    private failedGame(): void
    {
        this.endGame();
        this.sendToPlayers(new AlertComposer(3, Lang("games.no_one_won"),"game.ttt"))
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