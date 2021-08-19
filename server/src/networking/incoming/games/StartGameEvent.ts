import { UserEntity } from '../../../database/entities/UserEntity';
import { TicTacToe } from '../../../games/TicTacToe/TicTacToe';
import { Lang } from '../../../lang/Lang';
import { UIExt } from '../../../main';
import Logger from '../../../utils/Logger';
import { StatusEnum } from '../../../utils/StatusEnum';
import { WsUser } from '../../../utils/WsUser';
import { AlertComposer } from '../../outgoing/general/AlertComposer';
import { IncomingMessage } from '../IncomingMessage';

export class StartGameEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data.game) return
            
        if (!data.user) return;

        if (ws.game) return ws.sendMessage(new AlertComposer(1, Lang("games.self_busy"), `game.${data.game}`));

        let player: WsUser = UIExt.getInstance().findUserById(data.user);

        if (!player) return ws.sendMessage(new AlertComposer(1, Lang("user_offline"), `game.${data.game}`));

        if(player.status == StatusEnum.FREE) return ws.sendMessage(new AlertComposer(1, Lang("games.ttt.window.no_longer_request"), `game.${data.game}`));
        
        if (player.game) return ws.sendMessage(new AlertComposer(1, Lang("games.busy"), `game.${data.game}`));
        
        switch (data.game)
        {
            case "ttt":
                let game = new TicTacToe(ws.account.id, data.user)
                UIExt.getInstance().games.push(game);
                break;
        }

        Logger.Games(Lang("system.started_game")
            .replace("%user%", ws.account.username)
            .replace("%user2%", player.account.username)
            .replace("%game%",Lang(`games.${data.game}.name`)))
    }
}