import app from './app/app.js'
import 'dotenv/config'

import AppDataSource from './app/data-source.js'
import { saveGenreIfNotExist } from './app/services/store/genreStore.js'
import { getGenres } from './app/services/provider/genresProvider.js'
import { getProviders } from './app/services/provider/providersProvider.js'
import { saveIfNoExistsProvider } from './app/services/store/providerStore.js'


const port = process.env.SERVER_PORT || '3500'

const requiredEnv = ["TMDB_URL", "TMDB_TOKEN"]

for(const env of requiredEnv){
    if(process.env[env] == undefined){
        throw new Error(`Missing ${env} from .env file !`);
    }
}


AppDataSource.initialize()
    .then(async () => {
        
        await AppDataSource.synchronize();
        console.log("Connected to database");

        const genres = await getGenres();
        const providers = await getProviders("fr", "BE");

        for(const genre of genres){
            await saveGenreIfNotExist(genre.id, genre.name);
        }

        await saveIfNoExistsProvider(providers);
    })
    .catch((error) => console.log(error))

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
