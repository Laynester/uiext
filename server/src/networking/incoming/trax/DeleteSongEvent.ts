import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { UserEntity } from '../../../database/entities/UserEntity';
import { UIExt } from '../../../main';
import { RCON } from '../../../utils/RCON';
import { WsUser } from '../../../utils/WsUser';
import { AlertComposer } from '../../outgoing/trax/AlertComposer';
import { RequestedSongsComposer } from '../../outgoing/trax/RequestedSongsComposer';
import { IncomingMessage } from '../IncomingMessage';

export class DeleteSongComposer implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        let user = await UserEntity.createQueryBuilder("user").where({ id: ws.account.id }).getOne();

        let song = await SoundTrackEntity.createQueryBuilder("song").where({ id: data.id }).innerJoin("song.item", "item").select(['song', 'item']).getOne();

        if (!song) return;

        if (song.owner !== ws.account.id) return;

        if (!song.item) return;

        song.hidden = 1;
        await song.save();

        let songs = await SoundTrackEntity.createQueryBuilder("songs").where({ owner: ws.account.id,hidden:0 }).orderBy('id','DESC').getMany();

        ws.sendMessage(new RequestedSongsComposer(songs));
        ws.sendMessage(new AlertComposer(0,"You've deleted that song!"))
    }
}