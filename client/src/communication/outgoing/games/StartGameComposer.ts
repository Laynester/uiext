import { OutgoingMessage } from "../OutgoingMessage";

export class StartGameComposer implements OutgoingMessage
{
    public header = "game_start";
    data: any;

    constructor(game: string, user: number)
    {
        this.data = {
            game: game,
            user
        };
    }
}