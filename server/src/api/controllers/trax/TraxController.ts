import { Request, Response } from "express";
import { UserEntity } from "../../../database/entities/UserEntity";
import { UIExt } from "../../../main";
import { TraxWindowComposer } from "../../../networking/outgoing/trax/TraxWindowComposer";

export class TraxController
{
    public static open = async (req: Request, res: Response) =>
    {
        let userId: number = parseInt(req.params.id);
        
        let user: UserEntity = await UserEntity.createQueryBuilder().where({ id: userId }).getOne();

        if (!user) return res.json({});

        UIExt.getInstance().sendToUser(user.id, new TraxWindowComposer(1));

        res.json({});
    }
}