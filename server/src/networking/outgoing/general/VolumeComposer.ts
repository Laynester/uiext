import { OutgoingMessage } from "../OutgoingMessage";

export class VolumeComposer implements OutgoingMessage
{
    public header = "volume";
    data: any;

    constructor(volume: number)
    {
        this.data = volume;
    }
}