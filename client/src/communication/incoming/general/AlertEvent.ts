import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class AlertEvent implements IncomingMessage
{
    parse(data: any): void
    {
        if (!data.window) return;

        switch (data.window)
        {
            case "trax":
                store.state.trax.alert = data;
                break;
            case "game.ttt":
                store.state.games.ttt.alert = data;
                break;
        }
    }
}