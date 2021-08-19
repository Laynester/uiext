import { OutgoingMessage } from "../../OutgoingMessage";

export class TicTacToeGameMove implements OutgoingMessage
{
    public header = "game_ttt_move";
    data: any;

    constructor(row:number, col: number)
    {
        this.data = {
            row, col
        };
    }
}