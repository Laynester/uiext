import { Request, Response } from "express";
import { UserEntity } from "../../../database/entities/UserEntity";
import { UIExt } from "../../../main";
import { TraxWindowComposer } from "../../../networking/outgoing/trax/TraxWindowComposer";
import { RCON } from "../../../utils/RCON";

export class TraxController
{
    public static open = async (req: Request, res: Response) =>
    {
        let userId: number = parseInt(req.params.id);

        if (!userId) return res.json({});
        
        let user: UserEntity = await UserEntity.createQueryBuilder().where({ id: userId }).getOne();

        if (!user) return res.json({});

        if (UIExt.getInstance().config.features.trax)
        {
            UIExt.getInstance().sendToUser(user.id, new TraxWindowComposer(true,false));
        } else {
            if(UIExt.getInstance().config.features.disabledAlert) RCON.alertUser(user.id,"Trax is disabled") 
        }

        return res.json({});
    }
}