import store from '../../../../utils/store';
import { IncomingMessage } from '../../IncomingMessage';

export class TicTacToeGameBoardEvent implements IncomingMessage
{
    parse(data: any): void
    {
        if (!data.board) return;

        if (!data.turn) return;

        store.state.games.ttt.board = data.board;

        store.state.games.ttt.turn = data.turn;

        store.state.games.ttt.me = data.me;
    }
}