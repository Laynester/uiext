import * as express from 'express';
import * as http from 'http';
import "reflect-metadata";
import { Connection, createConnection, EntityManager } from 'typeorm';
import * as DBConfig from '../ormconfig.json';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { join } from 'path';
import Logger from './utils/Logger';
import HttpRouter from './router/HttpRouter';
import * as Config from '../config.json';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

export class TraxServer
{
    private static _instance: TraxServer
    private _app: express.Express;
    private _server: http.Server;

    private _database: EntityManager;

    constructor()
    {
        console.clear();

        this._app = express();

        this._app.use((req: express.Request, res: express.Response, next: express.NextFunction) =>
        {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

            next();
        });

        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());

        this._app.use(cors())

        this._app.use('/api', HttpRouter);

        this._server = http.createServer(this._app);

        this._server.listen(Config.port, () =>
        {
            Logger.Log(`Server started on port ${Config.port} :)`);
        });

        DBConfig.entities.push(join(__dirname, '/database/entities/*Entity.ts'))

        createConnection(DBConfig as MysqlConnectionOptions).then((connection: Connection) =>
        {
            this._database = connection.manager;
            Logger.Log('Connected to ' + connection.options.database)
        });
    }

    public static getInstance(): TraxServer
    {
        if (!TraxServer._instance) TraxServer._instance = new TraxServer();

        return TraxServer._instance;
    }

    public get database(): EntityManager
    {
        return this._database;
    }
}

TraxServer.getInstance();