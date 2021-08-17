import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class TraxWindowEvent implements IncomingMessage
{
    parse(data: any): void
    {
        store.state.window.trax = data.status;
        store.state.trax.editor = data.editor;
    }
}