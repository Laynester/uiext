import { Request, Response } from "express";
import { UserEntity } from "../../../database/entities/UserEntity";
import { UIExt } from "../../../main";
import { TraxWindowComposer } from "../../../networking/outgoing/trax/TraxWindowComposer";
import { RCON } from "../../../utils/RCON";
import { Room } from "../../../utils/room/Room";
import { WsUser } from "../../../utils/WsUser";

export class TraxController
{
    public static open = async (req: Request, res: Response) =>
    {
        let userId: number = parseInt(req.params.id);

        if (!userId) return res.json({});
        
        let user: WsUser = UIExt.getInstance().findUserById(userId);

        if (!user) return res.json({});

        if (!user.room) return res.json({});

        if (UIExt.getInstance().config.features.trax)
        {
            if (user.room.room.owner_id !== userId) return res.json({});
            
            UIExt.getInstance().sendToUser(user.account.id, new TraxWindowComposer(true,false));
        } else {
            if(UIExt.getInstance().config.features.disabledAlert) RCON.alertUser(user.account.id,"Trax is disabled") 
        }

        return res.json({});
    }

    public static pickup(req: Request, res: Response)
    {
        let roomId: number = parseInt(req.params.id);

        let room: Room = UIExt.getInstance().findRoomById(roomId);

        if (!room) return res.json({});
        
        room.traxManager.stopPlaying();

        let owner: WsUser = UIExt.getInstance().findUserById(room.room.owner_id);

        if (!owner) return res.json({})

        owner.sendMessage(new TraxWindowComposer(false, false));
        
        return res.json({});
    }
}