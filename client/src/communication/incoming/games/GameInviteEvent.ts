import store from '../../../utils/store';
import { IncomingMessage } from '../IncomingMessage';

export class GameInviteEvent implements IncomingMessage
{
    parse(data: any): void
    {
        if (!data.game) return;

        if (!data.user) return;

        switch (data.game)
        {
            case "ttt":
                if (this.existingInvite(store.state.games.ttt.invites, data.user.id).length) return;
                store.state.games.ttt.invites.push(data.user as never)
                break;
        }
    }

    existingInvite(ar: {id:number, username:string}[], id: number)
    {
        return ar.filter((e) => { return e.id === id });
    }
}