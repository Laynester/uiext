import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedSongsEvent implements IncomingMessage
{
    private _songs: any;

    public parse(data: any): void
    {
        this._songs = data;
    }

    public get songs(): any
    {
        return this._songs;
    }
}