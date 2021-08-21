import { ItemsEntity } from '../../../database/entities/ItemsEntity';
import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { UIExt } from '../../../main';
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

        let discs: ItemsEntity[] = await ItemsEntity
            .createQueryBuilder("item")
            .where({ item_id: UIExt.getInstance().config.trax.item_id, user_id: ws.account.id })
            .getMany();
        
        let discIds: number[] = [];
        
        discs.forEach((item) =>
        {
            let id = item.extra_data.split("\n").slice(-1)[0];
            discIds.push(parseInt(id));
        });

        let discSongs: SoundTrackEntity[] = await SoundTrackEntity.createQueryBuilder("song").where("song.id IN (:...ids) AND song.id NOT IN (:...songIds)", { ids: discIds, songIds: songIds }).getMany();

        discSongs.forEach(el =>
        {
            el['disc'] = true;
        })

        let songs: SoundTrackEntity[] = await SoundTrackEntity
            .createQueryBuilder("songs")
            .where("songs.id NOT IN (:...songIds)", {songIds:songIds})
            .andWhere({ owner: ws.account.id, hidden: 0 })
            .orderBy('id', 'DESC')
            .getMany();

        songs = songs.concat(discSongs);
        
        ws.sendMessage(new RequestedSongsComposer(songs));
    }
}