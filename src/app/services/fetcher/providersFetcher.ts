import axios from "axios";
import "dotenv/config"
import headers from "./headers.js";


const url = `${process.env.TMDB_URL}/watch/providers/movie`;

export async function getProviders(language: string, watch_region: string){
    const params = {
        language,
        watch_region
    }

    const result = await axios.get(url, {
        params,
        headers
    });

    const providers = result.data.results;
    
    const filteredProviders = providers.map((provider) => {
        const {provider_name, provider_id, logo_path} = provider;

        return {provider_name, provider_id, logo_path};
    })

    return filteredProviders;
}