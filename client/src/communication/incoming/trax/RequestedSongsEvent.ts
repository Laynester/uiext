import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedSongsEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.trax.songs = data;
    }
}