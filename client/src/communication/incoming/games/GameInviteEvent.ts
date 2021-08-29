import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

interface gameInvite
{
    game: string,
    user: {
        id: number
        username: string
    }
}
export class GameInviteEvent implements IncomingMessage
{
    private _game: string;
    private _user: gameInvite["user"];

    public parse(data: gameInvite): void
    {
        this._game = data.game;

        this._user = data.user;
    }

    public existingInvite(ar: {id:number, username:string}[], id: number)
    {
        return ar.filter((e) => { return e.id === id });
    }

    public get game(): string
    {
        return this._game;
    }

    public get user(): gameInvite["user"]
    {
        return this._user;
    }
}