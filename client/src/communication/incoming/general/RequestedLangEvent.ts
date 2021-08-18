import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedLangEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.lang = data;
    }
}