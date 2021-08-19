import { OutgoingMessage } from "../OutgoingMessage";

export class GameWindowComposer implements OutgoingMessage
{
    public header = "game_windowEvent";
    data: any;

    constructor(game: string, visible: boolean, playing: boolean = false)
    {
        this.data = {
            game: game,
            visible,
            playing
        }
    }
}