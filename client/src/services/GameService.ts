import { GameInviteEvent, GameWindowEvent, TicTacToeGameBoardEvent } from "../communication/incoming";
import store from "../utils/store";
import { Services } from "./Services";

export class GameService
{
    private static _instance: GameService;

    constructor()
    {
        GameService._instance = this;
        Services.getInstance().communication.addListener("game_windowEvent",this.gameWindow)
        Services.getInstance().communication.addListener("game_invite", this.gameInvite)
        Services.getInstance().communication.addListener("game_ttt_board", this.gameTTTBoard)
    }

    public static getInstance(): GameService
    {
        if (!GameService._instance) GameService._instance = new GameService();

        return GameService._instance;
    }

    public gameWindow(data: GameWindowEvent): void
    {
        switch (data.game)
        {
            case "ttt":
                store.state.window.ttt = data.visible;
                store.state.games.ttt.playing = data.playing;
                break;
        }
    }

    public gameInvite(data: GameInviteEvent): void
    {
        switch (data.game)
        {
            case "ttt":
                if (data.existingInvite(store.state.games.ttt.invites, data.user.id).length) return;
                store.state.games.ttt.invites.push(data.user)
                break;
        }
    }

    public gameTTTBoard(data: TicTacToeGameBoardEvent): void
    {
        store.state.games.ttt.board = data.board;

        store.state.games.ttt.turn = data.turn;

        store.state.games.ttt.me = data.me;
    }
}