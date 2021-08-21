import { SoundTrackEntity } from "../../../database/entities/SoundTrackEntity";
import { TraxCollectionEntity } from "../../../database/entities/TraxCollectionEntity";
import { OutgoingMessage } from "../OutgoingMessage";

export class PlayingSongComposer implements OutgoingMessage
{
    public header = "trax_playingSong";
    data: any;

    constructor(song: SoundTrackEntity)
    {
        this.data = song;
    }
}