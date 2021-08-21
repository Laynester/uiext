import * as WebSocket from 'ws';
import { UserEntity } from '../database/entities/UserEntity';
import { Games } from '../games/Games';
import { Lang } from '../lang/Lang';
import { UIExt } from '../main';
import { GameInviteEvent } from '../networking/incoming/games/GameInviteEvent';
import { StartGameEvent } from '../networking/incoming/games/StartGameEvent';
import { TicTacToeGameMoveEvent } from '../networking/incoming/games/TicTacToe/TicTacToeGameMoveEvent';
import { ConnectionEvent } from '../networking/incoming/general/ConnectionEvent';
import { PongEvent } from '../networking/incoming/general/PongEvent';
import { RequestConfigEvent } from '../networking/incoming/general/RequestConfigEvent';
import { RequestLangEvent } from '../networking/incoming/general/RequestLangEvent';
import { IncomingMessage } from '../networking/incoming/IncomingMessage';
import { BurnSongEvent } from '../networking/incoming/trax/BurnSongEvent';
import { CreateSongEvent } from '../networking/incoming/trax/CreateSongEvent';
import { DeleteSongComposer } from '../networking/incoming/trax/DeleteSongEvent';
import { ModifyPlaylistEvent } from '../networking/incoming/trax/ModifyPlaylistEvent';
import { RequestCollectionsEvent } from '../networking/incoming/trax/RequestCollectionsEvent';
import { RequestPlaylistEvent } from '../networking/incoming/trax/RequestPlaylistEvent';
import { RequestSongsEvent } from '../networking/incoming/trax/RequestSongsEvent';
import { TogglePlaylistEvent } from '../networking/incoming/trax/TogglePlaylistEvent';
import { PingComposer } from '../networking/outgoing/general/PingComposer';
import  {OutgoingMessage } from '../networking/outgoing/OutgoingMessage';
import Logger from './Logger';
import { Room } from './room/Room';
import { StatusEnum } from './StatusEnum';

export class WsUser
{
    private _wsu: WebSocket;
    private _events: Map<String, IncomingMessage>;
    private _account: UserEntity;
    private _game: Games;

    private _status: StatusEnum = StatusEnum.FREE;

    private _room: Room;

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
        this._events.set("trax_requestPlaylist", new RequestPlaylistEvent());
        this._events.set("trax_modifyPlaylist", new ModifyPlaylistEvent());
        this._events.set("trax_togglePlaylist", new TogglePlaylistEvent())

        // games
        this._events.set("game_invite", new GameInviteEvent());
        this._events.set("game_start", new StartGameEvent());

        // ttt
        this._events.set("game_ttt_move", new TicTacToeGameMoveEvent())
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
        else Logger.Error(message.data);
    }

    public onClose(): void
    {
        UIExt.getInstance().closeConnection(this);
        if (this._account) Logger.User(Lang("system.disconnected").replace("%username%", this.account.username));
        if (this._game) this._game.endGame()
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

    public get game(): Games
    {
        return this._game;
    }
    
    public set game(game: Games)
    {
        this._game = game;
    }

    public get status(): number
    {
        return this._status;
    }

    public set status(status: StatusEnum)
    {
        this._status = status;
    }

    public get room(): Room
    {
        return this._room;
    }

    public set room(room: Room)
    {
        this._room = room;
    }
}