import { OutgoingMessage } from "../OutgoingMessage";

export class TraxWindowComposer implements OutgoingMessage
{
    public header = "trax_window";
    data: any;

    constructor(status:number)
    {
        this.data = {
            status
        }
    }
}