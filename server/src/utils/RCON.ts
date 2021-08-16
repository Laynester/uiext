import * as config from '../../config.json';
import * as net from 'net';

export class RCON
{
    static sendMessage(message: any): void
    {
        let client: net.Socket = new net.Socket();

        client.connect(config.rcon_port, config.rcon_ip, () =>
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

    static giveItem(user: number, item: number)
    {
        RCON.sendMessage({
            key: 'giveitem',
            data: {
                user_id: user,
                item_id: item
            }
        });
    }
}