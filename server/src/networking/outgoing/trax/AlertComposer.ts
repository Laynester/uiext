import { TraxCollectionEntity } from "../../../database/entities/TraxCollectionEntity";
import { OutgoingMessage } from "../OutgoingMessage";

export class AlertComposer implements OutgoingMessage
{
    public header = "trax_alert";
    data: any;

    constructor(type: number, message: string)
    {
        this.data = {type,message};
    }
}