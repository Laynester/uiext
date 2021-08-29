import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class TraxWindowEvent implements IncomingMessage
{
    private _status: boolean;
    private _editor: boolean;

    public parse(data: {status: boolean, editor: boolean}): void
    {
        this._status = data.status;
        this._editor = data.editor;
    }

    public get status(): boolean
    {
        return this._status;
    }

    public get editor(): boolean
    {
        return this._editor;
    }
}