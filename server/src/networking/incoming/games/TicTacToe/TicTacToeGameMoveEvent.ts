import { TicTacToe } from '../../../../games/TicTacToe/TicTacToe';
import { WsUser } from '../../../../utils/WsUser';
import { IncomingMessage } from '../../IncomingMessage';

export class TicTacToeGameMoveEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        if (!data) return
        
        let game: TicTacToe = ws.game as TicTacToe;

        if (!game) return;

        let turn = "x";

        if (ws.account.id == game.host.account.id) turn = "o";

        game.moveOnCell(data.row, data.col,turn)

    }
}