"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_js_1 = require("./entity/User.js");
var UserToken_js_1 = require("./entity/UserToken.js");
var Provider_js_1 = require("./entity/Provider.js");
/*type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",*/
var AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [User_js_1.User, UserToken_js_1.default, Provider_js_1.Provider],
    synchronize: true,
    logging: false,
});
exports.default = AppDataSource;
