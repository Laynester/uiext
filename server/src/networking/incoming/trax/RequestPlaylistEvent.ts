import { UITraxPlaylistEntity } from '../../../database/entities/UIExtTraxPlaylistEntity';
import { WsUser } from '../../../utils/WsUser';
import { RequestedPlaylistComposer } from '../../outgoing/trax/RequestedPlaylistComposer';
import { IncomingMessage } from '../IncomingMessage';

export class RequestPlaylistEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!ws.room) return;

        let songs:UITraxPlaylistEntity[] = ws.room.traxManager.songs;

        ws.sendMessage(new RequestedPlaylistComposer(songs, ws.room.room.trax_active));
    }
}