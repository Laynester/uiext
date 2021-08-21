import { RoomEntity } from "../../database/entities/RoomEntity";
import { UIExt } from "../../main";
import { OutgoingMessage } from "../../networking/outgoing/OutgoingMessage";
import { PlayingSongComposer } from "../../networking/outgoing/trax/PlayingSongComposer";
import { TraxWindowComposer } from "../../networking/outgoing/trax/TraxWindowComposer";
import { RCON } from "../RCON";
import { TraxManager } from "./TraxManager";

export class Room
{
    private _id: number = 0;

    private _players: number[];

    private _traxManager: TraxManager;

    private _room: RoomEntity;

    constructor(id: number)
    {
        this._id = id;

        this._players = [];

        this.loadRoom();
    }

    private async loadRoom(): Promise<void>
    {
        let room: RoomEntity = await RoomEntity.createQueryBuilder("room").where({ id: this._id }).getOne();

        if (!room) this.dispose();

        this._room = room;

        this._traxManager = new TraxManager(this);
    }

    private dispose(): void
    {
        UIExt.getInstance().rooms = UIExt.getInstance().rooms.filter(room => room !== this);
    }

    public addPlayer(id: number): void
    {
        let user = UIExt.getInstance().findUserById(id);

        if (!user) return;

        user.room = this;
        
        this._players.push(id);
    }

    public removePlayer(id: number): void
    {
        this._players = this._players.filter(player => player !== id);

        if (!this._players.length) this.dispose();

        let user = UIExt.getInstance().findUserById(id);

        if (!user) return;

        user.room = null;

        user.sendMessage(new TraxWindowComposer(false, false));
        user.sendMessage(new PlayingSongComposer(null));
    }

    public sendToPlayers(message: OutgoingMessage): void
    {
        this._players.forEach((id) =>
        {
            UIExt.getInstance().sendToUser(id, message)
        })
    }

    public get players(): number[]
    {
        return this._players
    }

    public set players(players: number[])
    {
        this._players = players;
    }

    public get id(): number
    {
        return this._id;
    }

    public get room(): RoomEntity
    {
        return this._room;
    }

    public get traxManager(): TraxManager
    {
        return this._traxManager;
    }
}