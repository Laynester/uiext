import { WsUser } from '../../../utils/WsUser';
import { IncomingMessage } from '../IncomingMessage';

export class PongEvent implements IncomingMessage
{
    parse(ws: WsUser, data: any): void
    {
        //console.log('here')
    }
}