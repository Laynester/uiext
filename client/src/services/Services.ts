import { TraxService } from "./TraxService";
import { CommunicationManager } from "@/communication/CommunicationManager";
import { AppService } from "./AppService";
import { GameService } from "./GameService";

export class Services
{
    private static _instance: Services;
    
    private _communication: CommunicationManager;

    private _app: AppService;

    private _trax: TraxService;

    private _games: GameService;

    constructor()
    {
        Services._instance = this;
        this._communication = CommunicationManager.getInstance();
        this._app = AppService.getInstance();
        this._trax = TraxService.getInstance();
        this._games = GameService.getInstance();
    }

    public static getInstance(): Services
    {
        if (!Services._instance) Services._instance = new Services();

        return Services._instance;
    }

    public get communication(): CommunicationManager
    {
        return this._communication;
    }

    public get trax(): TraxService
    {
        return this._trax;
    }

    public get game(): GameService
    {
        return this._games;
    }
}