import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedCollectionsEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.trax.collection = data;
        store.state.trax.visibleCollection = data.slice(0, 6);
        store.state.trax.collectionPages = Math.ceil(data.length / 6);
    }
}