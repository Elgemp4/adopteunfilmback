import axios from "axios";
import "dotenv/config"

const tmdbApi = axios.create({
    baseURL: process.env.TMDB_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    }
});

export default tmdbApi;