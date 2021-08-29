import { AlertEvent, RequestedConfigEvent, RequestedLangEvent } from "../communication/incoming";
import store from "../utils/store";
import { Services } from "./Services";

export class AppService
{
    private static _instance: AppService;

    constructor()
    {
        AppService._instance = this;
        Services.getInstance().communication.addListener("config", this.setConfig);
        Services.getInstance().communication.addListener("language", this.setLang);
        Services.getInstance().communication.addListener("alert", this.setAlert);
    }

    public static getInstance(): AppService
    {
        if (!AppService._instance) AppService._instance = new AppService();

        return AppService._instance;
    }

    private setConfig(data: RequestedConfigEvent): void
    {
        store.state.config = data.config;
    }

    private setLang(data: RequestedLangEvent): void
    {
        store.state.lang = data.lang;
    }

    private setAlert(data: AlertEvent): void
    {
        let alert = {
            window:data.window, message:data.message, type:data.type
        }
        switch (data.window)
        {
            case "trax":
                store.state.trax.alert = alert;
                break;
            case "game.ttt":
                store.state.games.ttt.alert = alert;
                break;
        }
    }
}