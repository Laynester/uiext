import { Request, Response } from "express";
import { UIExt } from "../../../main";
import { VolumeComposer } from "../../../networking/outgoing/general/VolumeComposer";

export class SettingsController
{
    public static volume(req: Request, res: Response)
    {
        res.json({});

        let { setting, userId, volume } = req.params;
        
        let user = UIExt.getInstance().findUserById(parseInt(userId));

        if (!user) return;

        user.settings.volume_trax = parseInt(volume);

        user.settings.save();

        user.sendMessage(new VolumeComposer(parseInt(volume)))
    }
}