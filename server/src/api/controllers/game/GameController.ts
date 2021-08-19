
import { Request, Response } from "express";
import { UIExt } from "../../../main";import { GameWindowComposer } from "../../../networking/outgoing/games/GameWindowComposer";
import { StatusEnum } from "../../../utils/StatusEnum";
import { WsUser } from "../../../utils/WsUser";


export class GameController
{
    public static open = async (req: Request, res: Response) =>
    {
        let { game, id } = req.params;

        if (!game) return res.json({});

        if (!id) return res.json({});

        let user: WsUser = UIExt.getInstance().findUserById(parseInt(id))
        
        if (!user) return res.json({});

        user.status = StatusEnum.TTT;

        user.sendMessage(new GameWindowComposer(game, true));

        return res.json({});
    }

    public static close = async (req: Request, res: Response) =>
    {
        let { game, id } = req.params;

        if (!game) return res.json({});

        if (!id) return res.json({});

        let user: WsUser = UIExt.getInstance().findUserById(parseInt(id))
        
        if (!user) return res.json({});

        user.status = StatusEnum.FREE;

        user.sendMessage(new GameWindowComposer(game, false));

        if (user.game) user.game.endGame();
        
        return res.json({});
    }
}