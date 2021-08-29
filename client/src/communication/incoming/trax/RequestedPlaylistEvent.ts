import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class RequestedPlaylistEvent implements IncomingMessage
{
    private _playlist: any;

    public parse(data: any): void
    {
        this._playlist = data;
    }

    public get playlist(): any
    {
        return this._playlist
    }
}