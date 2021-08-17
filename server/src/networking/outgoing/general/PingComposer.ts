import { OutgoingMessage } from "../OutgoingMessage";

export class PingComposer implements OutgoingMessage
{
    public header = "ping";
    data: any;

    constructor()
    {
    }
}