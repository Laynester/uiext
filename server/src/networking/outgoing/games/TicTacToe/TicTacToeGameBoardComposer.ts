import { OutgoingMessage } from "../../OutgoingMessage";

export class TicTacToeGameBoardComposer implements OutgoingMessage
{
    public header = "game_ttt_board";
    data: any;

    constructor(board: Array<Array<string>>, turn: string, me:any)
    {
        this.data = {
            board,turn,me
        }
    }
}