import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"
import UserToken from "./entity/UserToken.js";
import Movie from "./entity/Movie.js";
import MovieReview from "./entity/MovieReview.js";
import Genre from "./entity/Genre.js";

/*type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",*/
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [User, UserToken, Movie, MovieReview, Genre],
    synchronize: true,
    logging: false,
})

export default AppDataSource;