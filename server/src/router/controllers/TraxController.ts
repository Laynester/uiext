import { Request, Response } from "express";
import { CatalogItemEntity } from "../../database/entities/CatalogItemEntity";
import { SoundTrackEntity } from "../../database/entities/SoundTrackEntity";
import { TraxCollectionEntity } from "../../database/entities/TraxCollectionEntity";
import { UserEntity } from "../../database/entities/UserEntity";
import * as config from '../../../config.json';
import { RCON } from "../../utils/RCON";

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
        if (!req.headers['sso']) res.json({ error: "invalid" }).status(400)

        let user = await UserEntity.getRepository().createQueryBuilder("user").where({ auth_ticket: req.headers['sso'] }).getOne();

        if (!user) res.json({ error: "invalid" }).status(400)

        let songs = await SoundTrackEntity
            .getRepository()
            .createQueryBuilder("track")
            .where({ owner: user.id })
            .getMany();

        res.json(songs)
    }

    static saveSong = async (req: Request, res: Response) =>
    {
        if (!req.headers['sso']) return res.json({ error: "invalid" }).status(400)

        let user = await UserEntity.getRepository().createQueryBuilder("user").where({ auth_ticket: req.headers['sso'] }).getOne();

        if (!user) return res.json({ error: "invalid" }).status(400);

        let { name, track, length } = req.body;

        if (!TraxController.validateSongString(track)) return res.json({ error: "invalid" }).status(400);

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

        res.json({ message: "success" });
    }

    static burnSong = async (req: Request, res: Response) =>
    {
        if (!req.headers['sso']) return res.json({ error: "invalid" })

        let user = await UserEntity.getRepository().createQueryBuilder("user").where({ auth_ticket: req.headers['sso'] }).getOne();

        if (!user) return res.json({ error: "invalid" }).status(400)

        if (!user.online) return res.json({ error: "" }).status(400)

        let { songId } = req.body;

        let song = await SoundTrackEntity.getRepository().createQueryBuilder("song").where({ id: songId }).innerJoin("song.item", "item").select(['song', 'item']).getOne();

        if (!song) return res.json({ error: "invalid" }).status(400)

        if (song.owner !== user.id) return res.json({ error: "invalid" }).status(400);

        if (!song.item) return res.json({ error: "invalid" }).status(400);

        RCON.giveItem(user.id, song.item.id)
        res.json({ message: 'success' }).status(400);
    }

    static validateSongString(string: string): boolean
    {
        let song = string.split(":")

        if (song.length < 1 || song.length > 8) return false;

        let safe: boolean = false;

        song.forEach((row) =>
        {
            let set = row.split(";");
            if (parseInt(set[0], 10)) return;
            set.forEach((col) =>
            {
                let column = col.split(',');
                if (column.length !== 2) return safe = false;
                if (column[0] == "0") return safe = false;
                safe = true;
            })
        });

        return safe;
    }
}