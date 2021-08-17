import { OutgoingMessage } from "../OutgoingMessage";

export class CreateSongComposer implements OutgoingMessage
{
    public header = "trax_createSong";
    data: any;

    constructor(name: string, track: string, length: number)
    {
        this.data = {
            name,
            track,
            length
        };
    }
}