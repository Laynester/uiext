import { OutgoingMessage } from "../OutgoingMessage";

export class TogglePlaylistComposer implements OutgoingMessage
{
    public header = "trax_togglePlaylist";
    data: any;

    constructor()
    {
        this.data = {
        };
    }
}