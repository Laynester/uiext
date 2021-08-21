import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { WsUser } from '../../../utils/WsUser';
import { RequestedSongsComposer } from '../../outgoing/trax/RequestedSongsComposer';
import { IncomingMessage } from '../IncomingMessage';

export class RequestSongsEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!ws.room) return;

        let songIds: number[] = [0];

        ws.room.traxManager.songs.forEach((song) =>
        {
            songIds.push(song.song_id);
        });
        
        let songs = await SoundTrackEntity
            .createQueryBuilder("songs")
            .where("songs.id NOT IN (:...songIds)", {songIds:songIds})
            .andWhere({ owner: ws.account.id, hidden: 0 })
            .orderBy('id', 'DESC')
            .getMany();

        ws.sendMessage(new RequestedSongsComposer(songs));
    }
}