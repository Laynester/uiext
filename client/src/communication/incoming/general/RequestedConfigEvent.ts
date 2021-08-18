import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedConfigEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.config = data;
    }
}