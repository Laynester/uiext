import { UIExt } from "../main";
import { GameWindowComposer } from "../networking/outgoing/games/GameWindowComposer";
import { OutgoingMessage } from "../networking/outgoing/OutgoingMessage";
import { WsUser } from "../utils/WsUser";

export class Games
{
    private _host: WsUser;

    private _secondary: WsUser;

    private _gameName: string;
    
    constructor(host: number, secondary: number, game: string)
    {
        this._host = UIExt.getInstance().findUserById(host);

        this._secondary = UIExt.getInstance().findUserById(secondary);

        this._gameName = game;

        this.sendToPlayers(new GameWindowComposer(game, true, true));

        this.host.game = this;

        this.secondary.game = this;
    }

    public sendToPlayers(msg: OutgoingMessage)
    {
        if (!this._host) return this.endGame();
        if (!this._secondary) return this.endGame();
        this._host.sendMessage(msg);
        this._secondary.sendMessage(msg)
    }

    public endGame(): void
    {
        UIExt.getInstance().games = UIExt.getInstance().games.filter((element) => { return element == this; });
        if (!this._host) return;
        if (!this._secondary) return;
        this.sendToPlayers(new GameWindowComposer(this._gameName, true, false));
        this._host.game = null;
        this._secondary.game = null;
    }

    public get host(): WsUser
    {
        return this._host
    }

    public get secondary(): WsUser
    {
        return this._secondary
    }

    public get gameName(): string
    {
        return this._gameName;
    }
}