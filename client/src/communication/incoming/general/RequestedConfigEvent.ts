import { IncomingMessage } from '../IncomingMessage';

export class RequestedConfigEvent implements IncomingMessage
{
    private _config: any;

    public parse(data: any): void
    {
        this._config = data;
    }

    public get config(): void
    {
        return this._config;
    }
}