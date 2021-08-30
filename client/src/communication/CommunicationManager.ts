import store from "../utils/store";
import { IncomingMessage, RequestedLangEvent, RequestedConfigEvent, AlertEvent, TraxWindowEvent, RequestedSongsEvent, RequestedCollectionsEvent, RequestedPlaylistEvent, PlayingSongEvent, GameWindowEvent, GameInviteEvent, TicTacToeGameBoardEvent } from "./incoming";
import { PingEvent } from "./incoming/general/PingEvent";
import { VolumeEvent } from "./incoming/general/VolumeEvent";
import { NuxRoomsEvent } from "./incoming/user/nux/NuxRoomsEvent";
import { ConnectionComposer, RequestLangComposer, RequestConfigComposer, OutgoingMessage } from "./outgoing";

export class CommunicationManager
{
    private static _instance: CommunicationManager;

    private _events: Map<String, IncomingMessage>;

    private _listeners: Array<{event: string, listener:Function}>

    private _webSocket: WebSocket;

    private _config: any;

    private reconnect: number = 0;

    private connected: boolean = false;

    private interval: number = 0;

    constructor()
    {
        CommunicationManager._instance = this;
        //  @ts-ignore
        if (!UIExtConfig) throw new Error('UIExtConfig is not defined!');

        //  @ts-ignore
        this._config = UIExtConfig;

        this._webSocket = new WebSocket(this._config.ws);
        this._webSocket.onmessage = this.onMessage.bind(this);
        this._webSocket.onopen = this.onOpen.bind(this);
        this._webSocket.onclose = this.onClose.bind(this);
        this._events = new Map<String, IncomingMessage>();
        this._listeners = [];
        this.registerEvents()
    }

    public static getInstance(): CommunicationManager
    {
        if (!CommunicationManager._instance) CommunicationManager._instance = new CommunicationManager();

        return CommunicationManager._instance;
    }

    private registerEvents(): void
    {
        this._events.set('ping', new PingEvent())
        this._events.set('language', new RequestedLangEvent());
        this._events.set("config", new RequestedConfigEvent());
        this._events.set("alert", new AlertEvent());
        this._events.set("volume", new VolumeEvent())

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

        // nux
        this._events.set("nux_rooms", new NuxRoomsEvent());
    }

    private onMessage(message: MessageEvent): void
    {
        let mes = JSON.parse(message.data);

        console.log(mes)

        if (typeof mes.header == "undefined") return;

        this.dispatchEvent(mes)
    }

    public addListener(event: string, listener: Function): void
    {
        this._listeners.push({event,listener});
    }

    public removeListener(event: string, listener: Function)
    {
        this._listeners = this._listeners.filter(e =>
        {
            return e == {event,listener}
        })
    }

    private dispatchEvent(mes: any): void
    {
        this._events.get(mes.header).parse(mes.data);
        this._listeners.forEach(listener =>
        {
            if (listener.event == mes.header)
            {
                listener.listener(this._events.get(mes.header));
            }
        })
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

    public sendMessage(message: OutgoingMessage): void
    {
        if (!this.connected) this.onClose();
        else this._webSocket.send(JSON.stringify(message))
    }
}