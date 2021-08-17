import { OutgoingMessage } from "../OutgoingMessage";

export class RequestSongsComposer implements OutgoingMessage
{
    public header = "trax_mySongs";
    data: any;

    constructor()
    {
        this.data = {};
    }
}