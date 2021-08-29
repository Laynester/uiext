import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedCollectionsEvent implements IncomingMessage
{
    private _collection: any[];

    public parse(data: any[]): void
    {
        this._collection = data;
    }

    public get collection(): any[]
    {
        return this._collection;
    }
}