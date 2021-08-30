import { IncomingMessage } from '../../IncomingMessage';

export class NuxRoomsEvent implements IncomingMessage
{
    private _rooms: Array<{image:string,id:number}>;

    public parse(data: Array<{image:string,id:number}>): void
    {
        this._rooms = data;
    }

    public get rooms(): Array<{ image: string, id: number }>
    {
        return this._rooms;
    }
}