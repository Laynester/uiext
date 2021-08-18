import { UIExt } from '../../../main';
import { Functions } from '../../../utils/Functions';
import { WsUser } from '../../../utils/WsUser';
import { RequestedLangComposer } from '../../outgoing/general/RequestedLangComposer';
import { IncomingMessage } from '../IncomingMessage';

export class RequestLangEvent implements IncomingMessage
{
    parse(ws: WsUser, data: any): void
    {
        ws.sendMessage(new RequestedLangComposer(Functions.getLang()));
    }
}