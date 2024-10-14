import axios from "axios";
import "dotenv/config"
import headers from "./tmdbApi.js";
import { User } from "../../entity/User.js";
import { getUserReview, saveMovieIfNotExists } from "../orm/movieORM.js";
import tmdbApi from "./tmdbApi.js";


const url = `${process.env.TMDB_URL}/discover/movie`;

export async function suggestMovies(userId: number, providerIds: number[]){
    const unreviewedMovies = [];
    let page = 1;

    while(unreviewedMovies.length < 10){
        const suggestedMovies = await getPage(page, providerIds);

        for(const movie of suggestedMovies.results){
            const review = await getUserReview(userId, movie.id);
            if(review == undefined){
                unreviewedMovies.push(await saveMovieIfNotExists(movie));
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
        page,
        with_watch_providers: watchProviders,
        sort_by: "popularity.desc"
    }

    const result = await tmdbApi.get("/discover/movie", {
        params
    });

    return result.data;
}