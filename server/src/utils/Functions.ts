import { UIExt } from "../main";

export class Functions
{
    public static validateSongString(string: string): boolean
    {
        let song = string.split(":")

        console.log('here 1')

        if (song.length < 0 || song.length > 8) return false;

        console.log('here 2')

        let safe: boolean = false;

        song.forEach((row) =>
        {
            let set = row.split(";");
            if (parseInt(set[0], 10))
            {
                set.forEach((col) =>
                {
                    let column = col.split(',');
                    if (column.length !== 2) return safe = false;
                    if (column[0] == "0") return safe = false;
                    safe = true;
                })
            }
        });

        return safe;
    }

    public static getLang(): any
    {
        return require(`../lang/${UIExt.getInstance().config.lang}.json`);
    }
}