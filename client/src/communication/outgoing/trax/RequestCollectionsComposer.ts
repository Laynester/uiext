import { OutgoingMessage } from "../OutgoingMessage";

export class RequestCollectionsComposer implements OutgoingMessage
{
    public header = "trax_requestCollections";
    data: any;

    constructor()
    {
        this.data = {};
    }
}