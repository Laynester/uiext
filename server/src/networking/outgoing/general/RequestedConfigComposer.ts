import { OutgoingMessage } from "../OutgoingMessage";

export class RequestedConfigComposer implements OutgoingMessage
{
    public header = "config";
    data: any;

    constructor(config: any)
    {
        this.data = config;
    }
}