import axios from "axios";
import "dotenv/config"
import headers from "./headers.js";


const url = `${process.env.TMDB_URL}/discover/movie`;

export async function suggestMovies(page: number, watchProviders: number[]){
    const params = {
        include_adult: "false",
        include_video: "false",
        language: "fr-FR",
        page,
        with_watch_providers: watchProviders,
        sort_by: "popularity.desc"
    }


    const result = await axios.get(url, {
        params,
        headers
    });

    return result.data;
}