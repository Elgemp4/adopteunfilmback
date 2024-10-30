import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"
import RefreshToken from "./entity/RefreshToken.js";
import Movie from "./entity/Movie.js";
import MovieReview from "./entity/MovieReview.js";
import Genre from "./entity/Genre.js";
import { Provider } from "./entity/Provider.js";


const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, RefreshToken, Provider, Movie, MovieReview, Genre],
    synchronize: true,
    logging: false,
})

export default AppDataSource;