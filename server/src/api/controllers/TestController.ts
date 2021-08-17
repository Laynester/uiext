import { Request, Response } from "express";

export class TestController
{
    public static data = async (req: Request, res: Response) =>
    {
        res.json({ "error": "no_account" });
    }
}