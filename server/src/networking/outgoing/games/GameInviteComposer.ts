import { UserEntity } from "../../../database/entities/UserEntity";
import { OutgoingMessage } from "../OutgoingMessage";

export class GameInviteComposer implements OutgoingMessage
{
    public header = "game_invite";
    data: any;

    constructor(game: string, user:UserEntity)
    {
        this.data = {
            game: game,
            user: {
                id: user.id,
                username: user.username
            }
        }
    }
}