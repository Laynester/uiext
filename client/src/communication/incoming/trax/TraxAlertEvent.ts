import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class TraxAlertEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.trax.alert = data;
    }
}