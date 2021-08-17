import { Router, Request, Response } from "express";
import { UIExt } from "../main";
import { TestController } from './controllers/TestController';
import TraxRouter from './controllers/trax/TraxRouter';

let router = Router();

router.use((req: Request, res: Response) =>
{
    if (!req.headers.uiextauth) return res.json({ error: "no" });

    if (req.headers.uiextauth !== UIExt.getInstance().config.tokenKey) return res.json({ error: "no" });
    
    req.next();
})

router.get('/settings', TestController.data);

router.use('/trax', TraxRouter);

export default router;