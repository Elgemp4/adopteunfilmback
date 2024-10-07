import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"

/*type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",*/
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [User],
    synchronize: true,
    logging: false,
})

export default AppDataSource;