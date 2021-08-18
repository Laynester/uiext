import { OutgoingMessage } from "../OutgoingMessage";

export class RequestConfigComposer implements OutgoingMessage
{
    public header = "config";
    data: any;

    constructor()
    {
        this.data = null
    }
}