import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import "reflect-metadata";
import { Connection, createConnection, EntityManager } from 'typeorm';
import * as DBConfig from '../ormconfig.json';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { join } from 'path';
import Logger from './utils/Logger';
import * as config from '../config.json';
import { WsUser } from './utils/WsUser';
import HttpRouter from './api/HttpRouter';
import { UserEntity } from './database/entities/UserEntity';
import { OutgoingMessage } from './networking/outgoing/OutgoingMessage';

export class UIExt
{
    private static _instance: UIExt
    private _ws: express.Express;
    private _server: http.Server;
    private _wss: WebSocket.Server;

    private _api: express.Express;
    private _apiServer: http.Server;

    private _database: EntityManager;

    private _config = config;


    private _wsuCollection: Array<WsUser>;

    constructor()
    {
        console.clear();

        Logger.logo();

        DBConfig.entities.push(join(__dirname, '/database/entities/*Entity.ts'))

        createConnection(DBConfig as MysqlConnectionOptions).then((connection: Connection) =>
        {
            this._database = connection.manager;
            Logger.Main('Connected to ' + connection.options.database)
        });

        this.registerSockets();
        this.registerAPI();
        this._wsuCollection = [];
    }

    public static getInstance(): UIExt
    {
        if (!UIExt._instance) UIExt._instance = new UIExt();

        return UIExt._instance;
    }

    private registerSockets(): void
    {
        this._ws = express();
        this._server = http.createServer(this._ws);
        this._wss = new WebSocket.Server({ server: this._server });

        this._wss.on('connection', this.onConnection.bind(this));

        this._server.listen(this._config.wsPort, () =>
        {
            Logger.Main(`WSS listening on ${this._config.wsPort}`);
        });
    }

    private registerAPI(): void
    {
        this._api = express();

        this._apiServer = http.createServer(this._api);

        this._api.use(express.json())

        this._api.use('/api', HttpRouter);

        this._apiServer.listen(config.apiPort, () =>
        {
            Logger.Main(`API listening on port ${config.apiPort}`);
        });
    }

    public onConnection(ws: WebSocket): void
    {
        this._wsuCollection.push(new WsUser(ws));
    }

    public closeConnection(ws: any)
    {
        this._wsuCollection = this._wsuCollection.filter(item => item !== ws);
    }

    public sendToUser(user: number, message: OutgoingMessage): void
    {
        let wsu: WsUser = this._wsuCollection.filter(item => item.account.id === user)[0];
        console

        if (!wsu) return;

        wsu.sendMessage(message);
    }

    public get database(): EntityManager
    {
        return this._database;
    }
    public get config(): any
    {
        return this._config;
    }
}

UIExt.getInstance();