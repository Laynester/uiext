import { NuxRoomsEvent } from "../communication/incoming/user/nux/NuxRoomsEvent";
import store from "../utils/store";
import { Services } from "./Services";

export class UserService
{
    private static _instance: UserService;

    constructor()
    {
        UserService._instance = this;
        Services.getInstance().communication.addListener("nux_rooms", this.setNuxRooms);
    }

    public static getInstance(): UserService
    {
        if (!UserService._instance) UserService._instance = new UserService();

        return UserService._instance;
    }

    public setNuxRooms(data: NuxRoomsEvent): void
    {
        store.state.user.nux.rooms = data.rooms;
    }
}