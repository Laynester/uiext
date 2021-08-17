import { UserEntity } from '../../../database/entities/UserEntity';
import Logger from '../../../utils/Logger';
import { WsUser } from '../../../utils/WsUser';
import { IncomingMessage } from '../IncomingMessage';

export class ConnectionEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data.sso) return ws.wsu.close();

        let user: UserEntity = await UserEntity.getRepository().createQueryBuilder().where({ auth_ticket: data.sso }).getOne();

        if (!user) return ws.wsu.close();

        ws.account = user;

        Logger.User(`${user.username} has connected`)
    }
}