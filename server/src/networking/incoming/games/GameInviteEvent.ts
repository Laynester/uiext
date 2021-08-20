import { UserEntity } from '../../../database/entities/UserEntity';
import { Lang } from '../../../lang/Lang';
import { UIExt } from '../../../main';
import Logger from '../../../utils/Logger';
import { WsUser } from '../../../utils/WsUser';
import { GameInviteComposer } from '../../outgoing/games/GameInviteComposer';
import { AlertComposer } from '../../outgoing/general/AlertComposer';
import { IncomingMessage } from '../IncomingMessage';

export class GameInviteEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data.game) return;

        if (!data.user) return;

        let user = await UserEntity.createQueryBuilder("user").where({ username: data.user }).getOne();

        if (!user) return;

        if (user.username == ws.account.username) return;
        
        if (user.online == 0) return ws.sendMessage(new AlertComposer(1, Lang('user_offline'), "game.ttt"));

        UIExt.getInstance().sendToUser(user.id, new GameInviteComposer(data.game, ws.account));

        ws.sendMessage(new AlertComposer(0, Lang('games.requested'), "game.ttt"));

        Logger.Games(Lang('system.requested_game').replace("%user%", ws.account.username).replace("%user2%", user.username));
    }
}