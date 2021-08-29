import { PlayingSongEvent, RequestedCollectionsEvent, RequestedPlaylistEvent, RequestedSongsEvent, TraxWindowEvent } from "../communication/incoming";
import { VolumeEvent } from "../communication/incoming/general/VolumeEvent";
import store from "../utils/store";
import { Services } from "./Services";

export class TraxService
{
    private static _instance: TraxService;

    constructor()
    {
        TraxService._instance = this;
        Services.getInstance().communication.addListener("trax_window", this.setWindow);
        Services.getInstance().communication.addListener("trax_requestedSongs", this.setRequestedSongs)
        Services.getInstance().communication.addListener("trax_requestedCollections", this.setCollections)
        Services.getInstance().communication.addListener("trax_requestedPlaylist", this.setPlaylist)
        Services.getInstance().communication.addListener("trax_playingSong", this.setPlaying);
        Services.getInstance().communication.addListener("volume", this.setVolume)
    }

    public static getInstance(): TraxService
    {
        if (!TraxService._instance) TraxService._instance = new TraxService();

        return TraxService._instance;
    }

    public setWindow(data: TraxWindowEvent): void
    {
        store.state.window.trax = data.status;
        store.state.trax.editor = data.editor;
    }

    public setRequestedSongs(data: RequestedSongsEvent): void
    {
        store.state.trax.songs = data.songs;
    }

    public setCollections(data: RequestedCollectionsEvent): void
    {
        store.state.trax.collection = data.collection;
        store.state.trax.visibleCollection = data.collection.slice(0, 6);
        store.state.trax.collectionPages = Math.ceil(data.collection.length / 6);
    }

    public setPlaylist(data: RequestedPlaylistEvent): void
    {
        store.state.trax.playlist = data.playlist;
    }

    public setPlaying(data: PlayingSongEvent): void
    {
        store.state.trax.playingSong = data.playing;
    }

    public setVolume(data: VolumeEvent): void
    {
        store.state.trax.volume = data.volume;
    }
}