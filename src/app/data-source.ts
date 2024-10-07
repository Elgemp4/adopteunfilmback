import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"
import UserToken from "./entity/UserToken.js";

/*type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",*/
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [User, UserToken],
    synchronize: true,
    logging: false,
})

export default AppDataSource;