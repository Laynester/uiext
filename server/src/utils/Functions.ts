export class Functions
{
    public static validateSongString(string: string): boolean
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