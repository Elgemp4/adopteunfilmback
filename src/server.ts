import app from './app/index.js'
import 'dotenv/config'

import AppDataSource from './app/data-source.js'
import { saveGenreIfNotExist } from './app/services/orm/genreORM.js'
import { getGenres } from './app/services/fetcher/genresFetcher.js'


const port = process.env.SERVER_PORT || '3500'

const requiredEnv = ["TMDB_URL", "TMDB_TOKEN", "DB_TYPE"]

for(const env of requiredEnv){
    if(process.env[env] == undefined){
        throw new Error(`Missing ${env} from .env file !`);
    }
}


AppDataSource.initialize()
    .then(async () => {
        console.log("Connected to database");

        const genres = await getGenres();

        for(const genre of genres){
            saveGenreIfNotExist(genre.id, genre.name);
        }
    })
    .catch((error) => console.log(error))

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
