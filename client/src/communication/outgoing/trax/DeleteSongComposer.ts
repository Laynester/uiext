import { OutgoingMessage } from "../OutgoingMessage";

export class DeleteSongComposer implements OutgoingMessage
{
    public header = "trax_deleteSong";
    data: any;

    constructor(id:number)
    {
        this.data = {
            id
        };
    }
}