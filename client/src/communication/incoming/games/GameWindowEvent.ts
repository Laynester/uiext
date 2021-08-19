import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class GameWindowEvent implements IncomingMessage
{
    parse(data: any): void
    {
        if (!data.game) return;

        switch (data.game)
        {
            case "ttt":
                store.state.window.ttt = data.visible;
                store.state.games.ttt.playing = data.playing;
                break;
        }
    }
}