import "dotenv/config"
import { getUserReview } from "../store/movieStore.js";
import tmdbApi from "./tmdbApi.js";


const url = `${process.env.TMDB_URL}/discover/movie`;

export async function suggestMovies(userId: number, providerIds: number[]){
    const unreviewedMovies = [];
    let page = 1;

    while(true){
        const suggestedMovies = await getPage(page, providerIds);
        console.log(suggestedMovies);
        if(suggestedMovies.results.length == 0){
            return unreviewedMovies;
        }

        for(const movie of suggestedMovies.results){
            const review = await getUserReview(userId, movie.id);
            if(review == undefined){
                unreviewedMovies.push(movie);
            }

            if(unreviewedMovies.length > 10){
                return unreviewedMovies;
            }
        }

        page++;
    }    
}

async function getPage(page: Number, watchProviders){
    const params = {
        include_adult: "false",
        include_video: "false",
        language: "fr-FR",
        watch_region: "BE",
        page,
        with_watch_providers: watchProviders.join("|"),
        sort_by: "popularity.desc"
    }

    const result = await tmdbApi.get("/discover/movie", {
        params
    });

    return result.data;
}