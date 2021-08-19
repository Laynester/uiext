import { OutgoingMessage } from "../OutgoingMessage";

export class GameInviteComposer implements OutgoingMessage
{
    public header = "game_invite";
    data: any;

    constructor(game: string, user: string)
    {
        this.data = {
            game: game,
            user
        };
    }
}