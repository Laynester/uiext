import { OutgoingMessage } from "../OutgoingMessage";

export class ConnectionComposer implements OutgoingMessage
{
    public header = "connection";
    data: any;

    constructor(sso: string)
    {
        this.data = {
            sso
        };
    }
}