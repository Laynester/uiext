import { SoundTrackEntity } from "../../../database/entities/SoundTrackEntity";
import { OutgoingMessage } from "../OutgoingMessage";

export class RequestedSongsComposer implements OutgoingMessage
{
    public header = "trax_requestedSongs";
    data: any;

    constructor(songs: SoundTrackEntity[])
    {
        this.data = songs;
    }
}