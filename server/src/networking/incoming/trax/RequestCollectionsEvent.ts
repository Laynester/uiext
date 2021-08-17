import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { TraxCollectionEntity } from '../../../database/entities/TraxCollectionEntity';
import { WsUser } from '../../../utils/WsUser';
import { RequestedCollectionsComposer } from '../../outgoing/trax/RequestedCollectionsComposer';
import { RequestedSongsComposer } from '../../outgoing/trax/RequestedSongsComposer';
import { IncomingMessage } from '../IncomingMessage';

export class RequestCollectionsEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        let collection = await TraxCollectionEntity
            .getRepository()
            .createQueryBuilder("collect")
            .innerJoin("collect.sets", "sets")
            .select(['collect', 'sets'])
            .getMany();
        
        ws.sendMessage(new RequestedCollectionsComposer(collection));
    }
}