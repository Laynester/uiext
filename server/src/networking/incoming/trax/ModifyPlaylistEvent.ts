import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { UITraxPlaylistEntity } from '../../../database/entities/UIExtTraxPlaylistEntity';
import { WsUser } from '../../../utils/WsUser';
import { RequestedPlaylistComposer } from '../../outgoing/trax/RequestedPlaylistComposer';
import { IncomingMessage } from '../IncomingMessage';
import { RequestPlaylistEvent } from './RequestPlaylistEvent';
import { RequestSongsEvent } from './RequestSongsEvent';

export class ModifyPlaylistEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data.id) return;

        if (!ws.room) return;

        if (data.remove)
        {
            let sound: UITraxPlaylistEntity = await UITraxPlaylistEntity.createQueryBuilder("song").where({ id: data.id }).getOne();
            ws.room.traxManager.removeFromPlaylist(sound);
            sound.remove();
            sound.save();
        } else
        {
            let song = await SoundTrackEntity.createQueryBuilder("song").where({ id: data.id }).getOne();

            if (!song) return;

            let added: UITraxPlaylistEntity = await UITraxPlaylistEntity
                .getRepository().create({
                    room_id: ws.room.id,
                    song_id: song.id
                }).save();
            
            added.song = song;

            ws.room.traxManager.songs.push(added);
        }

        new RequestSongsEvent().parse(ws, "");
        new RequestPlaylistEvent().parse(ws,"")

    }
}