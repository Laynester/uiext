import { SoundTrackEntity } from '../../../database/entities/SoundTrackEntity';
import { UserEntity } from '../../../database/entities/UserEntity';
import { UIExt } from '../../../main';
import { RCON } from '../../../utils/RCON';
import { WsUser } from '../../../utils/WsUser';
import { AlertComposer } from '../../outgoing/trax/AlertComposer';
import { IncomingMessage } from '../IncomingMessage';

export class BurnSongEvent implements IncomingMessage
{
    async parse(ws: WsUser, data: any): Promise<void>
    {
        let user = await UserEntity.createQueryBuilder("user").where({ id: ws.account.id }).getOne();

        if (!user.online) return;

        let currencies = await UIExt.getInstance().database.query(`SELECT * FROM users_currency WHERE user_id = '${ws.account.id}'`);

        let song = await SoundTrackEntity.createQueryBuilder("song").where({ id: data.id }).innerJoin("song.item", "item").select(['song', 'item']).getOne();

        if (!song) return;

        if (song.owner !== ws.account.id) return;

        if (!song.item) return;

        let safe: boolean = false;

        let currencyString: string = "";

        UIExt.getInstance().config.trax.cost.split(",").forEach((cost:string) =>
        {
            let currency: string[] = cost.split(":");

            if (currency.length < 2) return;

            switch (currency[0])
            {
                case "-1":
                    currencyString += `${currency[1]} Credits `
                    if (ws.account.credits >= parseInt(currency[1]))
                    {
                        safe = true;
                        RCON.giveCredits(ws.account.id, parseInt(currency[1]));
                    } else
                    {
                        safe = false;
                    }
                    break;
                default:
                    let temp = currencies.filter((e) => e.type === parseInt(currency[0]))[0];
                    switch (currency[0])
                    {
                        case "5":
                            currencyString += `${currency[1]} Diamonds `;
                            break;
                        case "0":
                            currencyString += `${currency[1]} Duckets `;
                            break;
                    }
                    if (temp.amount >= parseInt(currency[1]))
                    {
                        safe = true;
                        RCON.givePoints(ws.account.id, parseInt(currency[0]), -parseInt(currency[1]))
                    } else
                    {
                        safe = false
                    }
            }
        });

        if (!safe) return ws.sendMessage(new AlertComposer(1,"You don't have enough for this, it cost: " + currencyString));

        RCON.giveItem(ws.account.id, song.item.id)
    }
}