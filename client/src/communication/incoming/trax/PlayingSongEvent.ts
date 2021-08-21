import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class PlayingSongEvent implements IncomingMessage
{
    parse(data: any): void
    {
        console.log(data)
        store.state.trax.playingSong = data;
    }
}