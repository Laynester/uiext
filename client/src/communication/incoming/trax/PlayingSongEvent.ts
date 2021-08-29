import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class PlayingSongEvent implements IncomingMessage
{
    private _playing: any;

    public parse(data: any): void
    {
        this._playing = data;
    }

    public get playing(): void
    {
        return this._playing;
    }
}