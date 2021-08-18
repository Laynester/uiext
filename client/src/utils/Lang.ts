// @ts-nocheck
import store from "./store";

export function Lang(text: string)
{
    const fromKey = (key: string, remaining: string[] = [], traverse: { [key:string]: any } = null):any =>
    {
        traverse = traverse[key];

        if (!traverse) return text;

        if (remaining.length) return fromKey(remaining.shift(), remaining, traverse)
        else return traverse;
    }

    const parts: string[] = text.split(".");

    return fromKey(parts.shift(), parts, store.state.lang);
}