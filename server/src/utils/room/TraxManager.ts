import { SoundTrackEntity } from "../../database/entities/SoundTrackEntity";
import { UITraxPlaylistEntity } from "../../database/entities/UIExtTraxPlaylistEntity";
import { Lang } from "../../lang/Lang";
import { UIExt } from "../../main";
import { PlayingSongComposer } from "../../networking/outgoing/trax/PlayingSongComposer";
import { RCON } from "../RCON";
import { Room } from "./Room";

export class TraxManager
{
    private _room: Room;

    private _songs: UITraxPlaylistEntity[];

    private _cycle: NodeJS.Timeout;

    private _playingSong: number = 0;

    constructor(room: Room)
    {
        this._room = room;

        this.loadPlaylist();
    }

    public async loadPlaylist(): Promise<void>
    {
        let songs: UITraxPlaylistEntity[] = await UITraxPlaylistEntity
            .createQueryBuilder("songs")
            .where({ room_id: this._room.id })
            .innerJoin("songs.song", "song")
            .select(["songs","song"])
            .getMany();

        if (!songs) return;

        this._songs = songs;

        if (this._room.room.trax_active) this.playPlaylist();
    }

    public async stopPlaying(): Promise<void>
    {
        this._room.room.trax_active = 0;
        
        await this._room.room.save();

        if (this._room.room.trax_active) { this.playPlaylist() }
        else { this.stopPlaylist();}
    }

    public async togglePlaying(): Promise<void>
    {
        this._room.room.trax_active == 0 ? this._room.room.trax_active = 1 : this._room.room.trax_active = 0;

        await this._room.room.save();

        if (this._room.room.trax_active) { this.playPlaylist() }
        else { this.stopPlaylist();}
    }

    private playPlaylist(): void
    {
        let playing = this._songs[this._playingSong];

        if (!playing) return;

        if (!playing.song) return;

        this._room.sendToPlayers(new PlayingSongComposer(null));

        this._room.sendToPlayers(new PlayingSongComposer(playing.song));

        this._room.players.forEach(e =>
        {
            RCON.bubbleAlertUser(e, Lang("trax.now_playing").replace("%song%",playing.song.name).replace("%user%",playing.song.author), UIExt.getInstance().config.trax.bubble_icon)
        })

        this._cycle = setTimeout(() =>
        {
            if (this._playingSong < this.songs.length - 1) this._playingSong++;
            else this._playingSong = 0;

            this.playPlaylist();
        }, playing.song.length * 1000)
    }

    private stopPlaylist(): void
    {
        clearInterval(this._cycle);
        
        this._room.sendToPlayers(new PlayingSongComposer(null));
    }

    public removeFromPlaylist(song: UITraxPlaylistEntity): void
    {
        this._songs = this._songs.filter((sound) => sound.id !== song.id);
    }

    public get songs(): UITraxPlaylistEntity[]
    {
        return this._songs;
    }
}