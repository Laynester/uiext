import { OutgoingMessage } from "../OutgoingMessage";

export class RequestLangComposer implements OutgoingMessage
{
    public header = "language";
    data: any;

    constructor()
    {
        this.data = null
    }
}