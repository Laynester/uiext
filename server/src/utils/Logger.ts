import chalk = require("chalk");
import { UIExt } from "../main";
import * as version from '../../package.json';

export default class Logger
{
    public static logo()
    {
        let logo = `
.##.....##.####....########.##.....##.########
.##.....##..##.....##........##...##.....##...
.##.....##..##.....##.........##.##......##...
.##.....##..##.....######......###.......##...
.##.....##..##.....##.........##.##......##...
.##.....##..##.....##........##...##.....##...
..#######..####....########.##.....##....##...`;
        console.log(chalk.redBright(logo));
        console.log(`v: ${version.version}\n`);
    }

    public static Main(msg: string)
    {
        Logger.Log('UIExt', msg);
    }

    public static User(msg: string)
    {
        Logger.Log('User', msg);
    }

    public static Error(msg: string)
    {
        Logger.Log('Error', msg);
    }

    public static Trax(msg: string)
    {
        if(UIExt.getInstance().config.debug.trax) Logger.Log('Trax', msg);
    }

    public static Games(msg: string)
    {
        if(UIExt.getInstance().config.debug.games) Logger.Log('Games', msg);
    }

    public static Log(type: string,msg: string)
    {
        let date = new Date();

        let dateStr = chalk.yellow(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        console.log(`${dateStr} - ${Logger.colourify(type)} ${msg}`);
    }

    public static colourify(type)
    {
        let ret: string =  `${type}]`
        switch (type)
        {
            case "Error":
                return chalk.redBright(ret);
            case "UIExt":
                return chalk.grey(ret);
            case "User":
                return chalk.cyan(ret);
            case "Trax":
                return chalk.blueBright(ret);
            case "Games":
                return chalk.yellowBright(ret)
            default:
                return ret
        }
    }

}