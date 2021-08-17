import { OutgoingMessage } from "../OutgoingMessage";

export class BurnSongComposer implements OutgoingMessage
{
    public header = "trax_burnSong";
    data: any;

    constructor(id:number)
    {
        this.data = {
            id
        };
    }
}