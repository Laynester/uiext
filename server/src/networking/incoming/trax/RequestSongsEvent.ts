import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { WsUser } from '../../../utils/WsUser';
import { RequestedSongsComposer } from '../../outgoing/trax/RequestedSongsComposer';
import { IncomingMessage } from '../IncomingMessage';

export class RequestSongsEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        let songs = await SoundTrackEntity.createQueryBuilder("songs").where({ owner: ws.account.id,hidden:0 }).orderBy('id','DESC').getMany();

        ws.sendMessage(new RequestedSongsComposer(songs));
    }
}