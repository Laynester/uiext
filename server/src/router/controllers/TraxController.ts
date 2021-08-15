import { Request, Response } from "express";
import { CatalogItemEntity } from "../../database/entities/CatalogItemEntity";
import { SoundTrackEntity } from "../../database/entities/SoundTrackEntity";
import { TraxCollectionEntity } from "../../database/entities/TraxCollectionEntity";
import { UserEntity } from "../../database/entities/UserEntity";
import * as config from '../../../config.json';

export class TraxController
{
    static collections = async (req: Request, res: Response) =>
    {
        let collection = await TraxCollectionEntity
            .getRepository()
            .createQueryBuilder("collect")
            .innerJoin("collect.sets", "sets")
            .select(['collect', 'sets'])
            .getMany();

        res.json(collection)
    }

    static userSongs = async (req: Request, res: Response) =>
    {
        if (!req.headers['sso']) res.json({ error: "invalid" })

        let user = await UserEntity.getRepository().createQueryBuilder("user").where({ auth_ticket: req.headers['sso'] }).getOne();

        if (!user) res.json({ error: "invalid" })

        let songs = await SoundTrackEntity
            .getRepository()
            .createQueryBuilder("track")
            .where({ owner: user.id })
            .getMany();

        res.json(songs)
    }

    static saveSong = async (req: Request, res: Response) =>
    {
        if (!req.headers['sso']) res.json({ error: "invalid" })

        let user = await UserEntity.getRepository().createQueryBuilder("user").where({ auth_ticket: req.headers['sso'] }).getOne();

        if (!user) res.json({ error: "invalid" });

        let { name, track, length } = req.body;

        let soundtrack = await SoundTrackEntity.getRepository().create({
            code: `${user.username}-${Date.now()}`,
            name,
            author: user.username,
            track, length,
            owner: user.id
        }).save();

        await CatalogItemEntity.getRepository().createQueryBuilder().insert().values(
            {
                item_ids: config.item_id,
                catalog_name: `SONG ${soundtrack.name}`,
                page_id: config.page_id,
                song_id: soundtrack.id,
                extradata: soundtrack.code
            }
        ).execute();
    }
}