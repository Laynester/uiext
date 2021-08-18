import * as WebSocket from 'ws';
import { UserEntity } from '../database/entities/UserEntity';
import { Lang } from '../lang/Lang';
import { UIExt } from '../main';
import { ConnectionEvent } from '../networking/incoming/general/ConnectionEvent';
import { PongEvent } from '../networking/incoming/general/PongEvent';
import { RequestConfig, RequestConfigEvent } from '../networking/incoming/general/RequestConfigEvent';
import { RequestLangEvent } from '../networking/incoming/general/RequestLangEvent';
import { IncomingMessage } from '../networking/incoming/IncomingMessage';
import { BurnSongEvent } from '../networking/incoming/trax/BurnSongEvent';
import { CreateSongEvent } from '../networking/incoming/trax/CreateSongEvent';
import { DeleteSongComposer } from '../networking/incoming/trax/DeleteSongEvent';
import { RequestCollectionsEvent } from '../networking/incoming/trax/RequestCollectionsEvent';
import { RequestSongsEvent } from '../networking/incoming/trax/RequestSongsEvent';
import { PingComposer } from '../networking/outgoing/general/PingComposer';
import  {OutgoingMessage } from '../networking/outgoing/OutgoingMessage';
import Logger from './Logger';

export class WsUser
{
    private _wsu: WebSocket;
    private _events: Map<String, IncomingMessage>;
    private _account: UserEntity;

    constructor(ws: WebSocket)
    {
        this._wsu = ws;

        this._events = new Map<String, IncomingMessage>();

        this.registerEvents();

        this.keepAlive();

        ws.onmessage = this.onMessage.bind(this);
        
        ws.onclose = this.onClose.bind(this);
    }

    public registerEvents(): void
    {
        this._events.set("ping", new PongEvent());
        this._events.set("connection", new ConnectionEvent());
        this._events.set("language", new RequestLangEvent());
        this._events.set("config", new RequestConfigEvent())

        // trax 
        this._events.set("trax_mySongs", new RequestSongsEvent());
        this._events.set("trax_deleteSong",new DeleteSongComposer())
        this._events.set("trax_burnSong", new BurnSongEvent());
        this._events.set("trax_requestCollections", new RequestCollectionsEvent());
        this._events.set("trax_createSong", new CreateSongEvent());
    }

    public keepAlive(): void
    {
        setInterval(() =>
        {
            this.sendMessage(new PingComposer())
        }, 15000);
    }

    public onMessage(message: string | MessageEvent): void
    {
        let json: any;

        if (typeof message === 'string' || message instanceof String)
        {
            json = JSON.parse(message.replace(/&#47;/g, "/"));
        } else
        {
            json = JSON.parse(message.data);
        }

        let parser = this._events.get(json.header);

        if (parser) parser.parse(this, json.data);
        else Logger.Error(message.toString());
    }

    public onClose(): void
    {
        UIExt.getInstance().closeConnection(this);
        if (this._account) Logger.User(Lang("system.disconnected").replace("%username%", this.account.username));
    }

    public sendMessage(message: OutgoingMessage): void
    {
        this._wsu.send(JSON.stringify(message));
    }

    public get wsu(): WebSocket
    {
        return this._wsu;
    }

    public get account(): UserEntity
    {
        return this._account;
    }

    public set account(entity: UserEntity)
    {
        this._account = entity;
    }
}