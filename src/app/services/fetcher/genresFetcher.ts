import axios from "axios";
import "dotenv/config"
import tmdbApi from "./tmdbApi.js";



export async function getGenres(){
    const response = await tmdbApi.get("/genre/movie/list");

    return response.data.genres;
}
