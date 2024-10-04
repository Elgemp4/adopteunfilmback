import { Sequelize } from "sequelize";

import 'dotenv/config';

export default class Connection{
    public static get instance() {
        if(this._instance == undefined){
            return new Connection();
        }
    }

    private static _instance;

    private _db;

    private constructor() {
        const type = process.env.DB_TYPE;

        if(type == "sqlite"){
            const storage = process.env.DB_FILE

            this._db = new Sequelize({
                dialect: type,
                storage
            })
        }
        else if(type == "mariadb"){
            const host = process.env.DB_HOST;
            const port = Number.parseInt(process.env.DB_PORT);
            const username = process.env.DB_USER;
            const password = process.env.DB_PASS;

            this._db = new Sequelize({
                host,
                port,
                username,
                password
            })
        }
        else{
            throw new Error("Bad database type must be of type sqlite or mariadb !");
        }
    }
}


