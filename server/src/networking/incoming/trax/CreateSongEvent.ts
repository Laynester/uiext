import { CatalogItemEntity } from '../../../database/entities/CatalogItemEntity';
import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { Lang } from '../../../lang/Lang';
import { UIExt } from '../../../main';
import { Functions } from '../../../utils/Functions';
import Logger from '../../../utils/Logger';
import { WsUser } from '../../../utils/WsUser';
import { AlertComposer } from '../../outgoing/trax/AlertComposer';
import { RequestedSongsComposer } from '../../outgoing/trax/RequestedSongsComposer';
import { TraxWindowComposer } from '../../outgoing/trax/TraxWindowComposer';
import { IncomingMessage } from '../IncomingMessage';

export class CreateSongEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        let { name, track, length, editId } = data;

        if (!Functions.validateSongString(track)) return ws.sendMessage(new AlertComposer(1, Lang("trax.invalid_soundtrack")));

        let songs = await SoundTrackEntity.createQueryBuilder("songs").where({ owner: ws.account.id, hidden: 0 }).orderBy('id', 'DESC').getMany();
        
        if (editId)
        {
            let soundtrack = await SoundTrackEntity.getRepository().createQueryBuilder("song").where({ id: editId }).getOne();

            if (soundtrack)
            {
                soundtrack.track = track;
                soundtrack.length = length * 2;
                soundtrack.name = name;
                await soundtrack.save();

                ws.sendMessage(new RequestedSongsComposer(songs));
                ws.sendMessage(new AlertComposer(0, Lang("trax.edited_song")));
                ws.sendMessage(new TraxWindowComposer(true, false));

                Logger.Trax(`${ws.account.username} ${Lang("system.edited_song")}`)
            }
        } else
        {
            let soundtrack = await SoundTrackEntity.getRepository().create({
                code: `${ws.account.username}-${Date.now()}`,
                name,
                author: ws.account.username,
                track,
                length: length * 2,
                owner: ws.account.id
            }).save();
    
            await CatalogItemEntity.getRepository().createQueryBuilder().insert().values(
                {
                    item_ids: UIExt.getInstance().config.trax.item_id,
                    catalog_name: `SONG ${soundtrack.name}`,
                    page_id: UIExt.getInstance().config.trax.page_id,
                    song_id: soundtrack.id,
                    extradata: soundtrack.code
                }
            ).execute();
    
            ws.sendMessage(new RequestedSongsComposer(songs));
    
            ws.sendMessage(new AlertComposer(0, Lang("trax.created_song")));
            ws.sendMessage(new TraxWindowComposer(true, false));
            Logger.Trax(`${ws.account.username} ${Lang("system.created_song")}`)
            
        }
    }
}