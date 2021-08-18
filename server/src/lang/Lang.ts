import { UIExt } from "../main";
import * as english from "./en.json";

export function Lang(text: string)
{
    const fromKey = (key: string, remaining: string[] = [], traverse: { [key:string]: any } = null) =>
    {
        traverse = traverse[key];

        if (!traverse) return null;

        if (remaining.length) return fromKey(remaining.shift(), remaining, traverse)
        else return traverse;
    }

    let parts = text.split(".");

    switch (UIExt.getInstance().config.lang)
    {
        case "en":
        default:
            return fromKey(parts.shift(), parts, english);
    }
}