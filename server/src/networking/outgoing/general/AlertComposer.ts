import { OutgoingMessage } from "../OutgoingMessage";

export class AlertComposer implements OutgoingMessage
{
    public header = "alert";
    data: any;

    constructor(type: number, message: string, window: string)
    {
        this.data = {type,message,window};
    }
}