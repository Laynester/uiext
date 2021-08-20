import { MessengerFriendshipsEntity } from '../../../database/entities/MessengerFriendshipsEntity';
import { UserEntity } from '../../../database/entities/UserEntity';
import { Lang } from '../../../lang/Lang';
import { UIExt } from '../../../main';
import Logger from '../../../utils/Logger';
import { RCON } from '../../../utils/RCON';
import { WsUser } from '../../../utils/WsUser';
import { GameInviteComposer } from '../../outgoing/games/GameInviteComposer';
import { AlertComposer } from '../../outgoing/general/AlertComposer';
import { IncomingMessage } from '../IncomingMessage';

export class GameInviteEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data.game) return;

        if (data.friends)
        {
            let friends = await MessengerFriendshipsEntity.createQueryBuilder().where({ user_two_id: ws.account.id }).getMany();

            if (!friends) return;

            ws.sendMessage(new AlertComposer(0, Lang('games.requested'), "game.ttt"));

            friends.forEach((friend) =>
            {
                let friendUser: WsUser = UIExt.getInstance().findUserById(friend.user_one_id);
                if (friendUser)
                {
                    friendUser.sendMessage(new GameInviteComposer(data.game, ws.account));
                    RCON.bubbleAlertUser(friend.user_one_id, Lang('games.invited').replace("%user%",ws.account.username).replace("%game%",Lang(`games.${data.game}.name`)), UIExt.getInstance().config.games.icon)
                }
            });

            return;
        }

        if (!data.user) return;

        let user = await UserEntity.createQueryBuilder("user").where({ username: data.user }).getOne();

        if (!user) return;

        if (user.username == ws.account.username) return;
        
        if (user.online == 0) return ws.sendMessage(new AlertComposer(1, Lang('user_offline'), "game.ttt"));

        UIExt.getInstance().sendToUser(user.id, new GameInviteComposer(data.game, ws.account));

        ws.sendMessage(new AlertComposer(0, Lang('games.requested'), "game.ttt"));
        RCON.bubbleAlertUser(user.id, Lang('games.invited').replace("%user%",ws.account.username).replace("%game%",Lang(`games.${data.game}.name`)), UIExt.getInstance().config.games.icon)

        Logger.Games(Lang('system.requested_game').replace("%user%", ws.account.username).replace("%user2%", user.username));
    }
}