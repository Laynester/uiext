import { IncomingMessage } from '../IncomingMessage';

export class AlertEvent implements IncomingMessage
{
    private _window: string;
    private _message: string;
    private _type: Number;

    public parse(data: {window: string, message: string, type: Number}): void
    {
        this._window = data.window;
        this._message = data.message;
        this._type = data.type;
    }

    public get window(): string
    {
        return this._window;
    }

    public get message(): string
    {
        return this._message;
    }

    public get type(): Number
    {
        return this._type;
    }
}