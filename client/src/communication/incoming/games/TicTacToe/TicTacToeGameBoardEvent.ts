import store from '../../../../utils/store';
import { IncomingMessage } from '../../IncomingMessage';

interface board{
    board: Array<Array<string>>,
    turn: string,
    me:any
}
export class TicTacToeGameBoardEvent implements IncomingMessage
{
    private _board: board["board"];
    private _turn: string;
    private _me: any;

    public parse(data: board): void
    {
        this._board = data.board;
        this._turn = data.turn;
        this._me = data.me;
    }

    public get board(): board["board"]
    {
        return this._board;
    }

    public get turn(): string
    {
        return this._turn;
    }

    public get me(): any
    {
        return this._me;
    }
}