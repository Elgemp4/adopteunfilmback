import app from './app/index.js'
import 'dotenv/config'

import AppDataSource from './app/data-source.js'
import { getGenre, saveGenreIfNotExist } from './app/services/orm/genreORM.js'
import { getGenres } from './app/services/fetcher/genresFetcher.js'

const port = process.env.SERVER_PORT || '3500'

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
