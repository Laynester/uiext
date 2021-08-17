import { TraxCollectionEntity } from "../../../database/entities/TraxCollectionEntity";
import { OutgoingMessage } from "../OutgoingMessage";

export class RequestedCollectionsComposer implements OutgoingMessage
{
    public header = "trax_requestedCollections";
    data: any;

    constructor(collection: TraxCollectionEntity[])
    {
        this.data = collection;
    }
}