import { OutgoingMessage } from "../OutgoingMessage";

export class ModifyPlaylistComposer implements OutgoingMessage
{
    public header = "trax_modifyPlaylist";
    data: any;

    constructor(id: number, remove: boolean = false)
    {
        this.data = {
            id, remove
        };
    }
}