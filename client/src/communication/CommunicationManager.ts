import store from "../utils/store";
import { IncomingMessage, RequestedLangEvent, RequestedConfigEvent, AlertEvent, TraxWindowEvent, RequestedSongsEvent, RequestedCollectionsEvent, RequestedPlaylistEvent, PlayingSongEvent, GameWindowEvent, GameInviteEvent, TicTacToeGameBoardEvent } from "./incoming";
import { ConnectionComposer, RequestLangComposer, RequestConfigComposer, OutgoingMessage } from "./outgoing";

export class CommunicationManager
{
    private static _instance: CommunicationManager;

    private _events: Map<String, IncomingMessage>;

    private _webSocket: WebSocket;

    private _config: any;

    private reconnect: number = 0;

    private connected: boolean = false;

    private interval: number = 0;

    constructor()
    {
        //  @ts-ignore
        if (!UIExtConfig) throw new Error('UIExtConfig is not defined!');

        //  @ts-ignore
        this._config = UIExtConfig;

        this._webSocket = new WebSocket(this._config.ws);
        this._webSocket.onmessage = this.onMessage.bind(this);
        this._webSocket.onopen = this.onOpen.bind(this);
        this._webSocket.onclose = this.onClose.bind(this);
        this._events = new Map<String, IncomingMessage>();
        this.registerMessages();
    }

    public static getInstance(): CommunicationManager
    {
        if (!CommunicationManager._instance) CommunicationManager._instance = new CommunicationManager();

        return CommunicationManager._instance;
    }

    private registerMessages(): void
    {
        this._events.set('language', new RequestedLangEvent());
        this._events.set("config", new RequestedConfigEvent());
        this._events.set("alert", new AlertEvent())

        // trax
        this._events.set('trax_window', new TraxWindowEvent());
        this._events.set('trax_requestedSongs', new RequestedSongsEvent());
        this._events.set('trax_requestedCollections', new RequestedCollectionsEvent());
        this._events.set('trax_requestedPlaylist', new RequestedPlaylistEvent());
        this._events.set('trax_playingSong', new PlayingSongEvent())

        // games
        this._events.set("game_windowEvent", new GameWindowEvent());
        this._events.set("game_invite", new GameInviteEvent())

        // ttt
        this._events.set("game_ttt_board", new TicTacToeGameBoardEvent())
    }

    private onMessage(message: string | MessageEvent): void
    {
        let json: any;

        if (typeof message === 'string' || message instanceof String)
        {
            json = JSON.parse(message.replace(/&#47;/g, "/"));
        } else
        {
            json = JSON.parse(message.data);
        }

        const parser = this._events.get(json.header);

        if (parser) parser.parse(json.data);
        else console.log(message.toString());
    }

    private onOpen(): void
    {
        this.connected = true;
        this.reconnect = 0;
        this.sendMessage(new ConnectionComposer(this._config.sso));
        if (!store.state.lang) this.sendMessage(new RequestLangComposer());
        if (!store.state.config) this.sendMessage(new RequestConfigComposer())
    }

    private onClose(): void
    {
        this.connected = false;
        this.interval = setInterval(() =>
        {
            if (this.reconnect === 5) return clearInterval(this.interval);
            if (this.connected) return clearInterval(this.interval);

            this.reconnect++;

            this._webSocket = new WebSocket(this._config.ws);
            this._webSocket.onmessage = this.onMessage.bind(this);
            this._webSocket.onopen = this.onOpen.bind(this);
            this._webSocket.onclose = this.onClose.bind(this);
        }, 2000)
    }

    private sendMessage(message: OutgoingMessage): void
    {
        if (!this.connected) this.onClose();
        else this._webSocket.send(JSON.stringify(message))
    }
}