import { IncomingMessage } from '../IncomingMessage';

export class VolumeEvent implements IncomingMessage
{
    private _volume: number;

    public parse(data: number): void
    {
        this._volume = data;
    }

    public get volume(): number
    {
        return this._volume;
    }
}