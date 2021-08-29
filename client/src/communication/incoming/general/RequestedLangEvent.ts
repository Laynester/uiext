import { IncomingMessage } from '../IncomingMessage';

export class RequestedLangEvent implements IncomingMessage
{
    private _lang: any;

    public parse(data: any): void
    {
        this._lang = data;
    }

    public get lang(): any
    {
        return this._lang;
    }
}