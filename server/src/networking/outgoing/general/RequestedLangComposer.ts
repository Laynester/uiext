import { OutgoingMessage } from "../OutgoingMessage";

export class RequestedLangComposer implements OutgoingMessage
{
    public header = "language";
    data: any;

    constructor(lang: any)
    {
        this.data = lang;
    }
}