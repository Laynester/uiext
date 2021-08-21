import { OutgoingMessage } from "../OutgoingMessage";

export class RequestPlaylistComposer implements OutgoingMessage
{
    public header = "trax_requestPlaylist";
    data: any;

    constructor()
    {
        this.data = {};
    }
}