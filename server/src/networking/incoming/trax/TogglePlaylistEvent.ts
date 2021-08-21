import { WsUser } from '../../../utils/WsUser';
import { IncomingMessage } from '../IncomingMessage';
import { RequestPlaylistEvent } from './RequestPlaylistEvent';

export class TogglePlaylistEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!ws.room) return;

        await ws.room.traxManager.togglePlaying()

        new RequestPlaylistEvent().parse(ws, "");
    }
}