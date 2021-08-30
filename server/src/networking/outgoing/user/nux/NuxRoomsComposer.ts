import { OutgoingMessage } from "../../OutgoingMessage";

export class NuxRoomsComposer implements OutgoingMessage
{
    public header = "nux_rooms";
    data: any;

    constructor(rooms: any)
    {
        this.data = rooms;
    }
}