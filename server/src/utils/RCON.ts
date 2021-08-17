import * as net from 'net';
import { UIExt } from '../main';

export class RCON
{
    static sendMessage(message: any): void
    {
        let client: net.Socket = new net.Socket();

        client.connect(UIExt.getInstance().config.rcon_port, UIExt.getInstance().config.rcon_ip, () =>
        {
            client.write(JSON.stringify(message));
        });
        client.on('data', (data) =>
        {
            client.destroy();
        });
        client.on('error', (err) =>
        {
            console.log(err)
        })
    };

    static giveItem(user_id: number, item_id: number)
    {
        RCON.sendMessage({
            key: 'giveitem',
            data: {
                user_id,
                item_id,
            }
        });
    }

    static giveCredits(user_id: number, credits: number)
    {
        RCON.sendMessage({
            key: 'givecredits',
            data: {
                user_id,
                credits
            }
        })
    }

    static givePoints(user_id: number, type: number, points: number)
    {
        RCON.sendMessage({
            key: 'givepoints',
            data: {
                user_id,
                points,
                type
            }
        })
    }
}