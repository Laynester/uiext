import { Request, Response } from "express";
import { UIExt } from "../../../main";
import { Room } from "../../../utils/room/Room";

export class RoomController
{
    public static enter(req: Request, res: Response)
    {
        let { roomId, userId } = req.params;

        if (!roomId) return res.json({});

        if (!userId) return res.json({});

        let room: Room = UIExt.getInstance().findRoomById(parseInt(roomId));

        if (!room)
        {
            room = new Room(parseInt(roomId));
            UIExt.getInstance().rooms.push(room);
        }

        room.addPlayer(parseInt(userId))

        return res.json({});
    }

    public static leave(req: Request, res: Response)
    {
        let { roomId, userId } = req.params;

        if (!roomId) return res.json({});

        if (!userId) return res.json({});

        let room: Room = UIExt.getInstance().findRoomById(parseInt(roomId));

        if (!room) return res.json({});

        room.removePlayer(parseInt(userId));

        return res.json({});
    }
}