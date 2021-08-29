import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class GameWindowEvent implements IncomingMessage
{
    private _game: string;
    private _visible: boolean;
    private _playing: boolean;

    public parse(data: {game: string, visible: boolean, playing: boolean}): void
    {
        this._game = data.game;

        this._visible = data.visible;

        this._playing = data.playing;
    }

    public get game(): string
    {
        return this._game;
    }

    public get visible(): boolean
    {
        return this._visible;
    }

    public get playing(): boolean
    {
        return this._playing;
    }
}