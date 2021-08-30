import { Request, Response } from "express";
import { RoomEntity } from "../../../database/entities/RoomEntity";
import { UIExt } from "../../../main";
import { NuxRoomsComposer } from "../../../networking/outgoing/user/nux/NuxRoomsComposer";
import { WsUser } from "../../../utils/WsUser";

export class ConnectionController
{
    public static login(req: Request, res: Response)
    {
        res.json({});

        let { userId } = req.params;

        if (!userId) return;

        let user = UIExt.getInstance().findUserById(parseInt(userId));

        if (!user) return;

        const nuxrooms = async () =>
        {
            if (!UIExt.getInstance().config.features.nuxRooms) return;

            let rooms: RoomEntity[] = await RoomEntity.createQueryBuilder().where({ owner_id: user.account.id }).getMany();

            user.sendMessage(new NuxRoomsComposer(UIExt.getInstance().config.nux.rooms));

            if (!rooms)
            {
                user.sendMessage(new NuxRoomsComposer(UIExt.getInstance().config.nux.rooms));
            }
        }

        nuxrooms();

    }
}