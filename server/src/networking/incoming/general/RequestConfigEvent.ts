import { UIExt } from '../../../main';
import { WsUser } from '../../../utils/WsUser';
import { RequestedConfigComposer } from '../../outgoing/general/RequestedConfigComposer';
import { IncomingMessage } from '../IncomingMessage';

export class RequestConfigEvent implements IncomingMessage
{
    parse(ws: WsUser, data: any): void
    {
        ws.sendMessage(new RequestedConfigComposer(UIExt.getInstance().config.client));
    }
}