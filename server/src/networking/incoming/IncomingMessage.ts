import { WsUser } from "../../utils/WsUser";

export interface IncomingMessage
{
    parse(ws: WsUser, data: any): void;
}