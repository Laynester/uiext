import { UITraxPlaylistEntity } from "../../../database/entities/UIExtTraxPlaylistEntity";
import { OutgoingMessage } from "../OutgoingMessage";

export class RequestedPlaylistComposer implements OutgoingMessage
{
    public header = "trax_requestedPlaylist";
    data: any;

    constructor(songs: UITraxPlaylistEntity[], playing: number)
    {
        this.data = {
            songs,
            playing
        };
    }
}