import { UIExt } from "../main";

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

    let lang = require(`./${UIExt.getInstance().config.lang}.json`);

    if (!lang) return text;

    return fromKey(parts.shift(), parts, lang)
}