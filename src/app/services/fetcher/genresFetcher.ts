import axios from "axios";
import "dotenv/config"
import headers from "./headers.js";


const url = `${process.env.TMDB_URL}/genre/movie/list`;

export async function getGenres(){
    const response = (await axios.get(url,{headers}));

    return response.data.genres;
}
