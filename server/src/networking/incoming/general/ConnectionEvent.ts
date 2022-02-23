import { UserEntity } from '../../../database/entities/UserEntity';
import { UserSettingsEntity } from '../../../database/entities/UserSettingsEntity';
import { Lang } from '../../../lang/Lang';
import Logger from '../../../utils/Logger';
import { WsUser } from '../../../utils/WsUser';
import { VolumeComposer } from '../../outgoing/general/VolumeComposer';
import { IncomingMessage } from '../IncomingMessage';

export class ConnectionEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data.sso) return ws.wsu.close();

        let user: UserEntity = await UserEntity.getRepository().createQueryBuilder().where({ auth_ticket: data.sso }).getOne();

        if (!user) return ws.wsu.close();

        ws.account = user;

        Logger.User(Lang("system.connected").replace("%username%", ws.account.username));

        let settings: UserSettingsEntity = await UserSettingsEntity.createQueryBuilder("user").where({ user_id: user.id }).getOne();

        if (!settings)
        {
            settings = new UserSettingsEntity();
            settings.user_id = user.id;
            await settings.save();
        }

        ws.settings = settings;

        ws.sendMessage(new VolumeComposer(settings.volume_trax));

    }
}