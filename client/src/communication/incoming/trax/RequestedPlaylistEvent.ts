import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedPlaylistEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.trax.playlist = data;
    }
}