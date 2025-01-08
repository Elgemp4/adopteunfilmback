import "dotenv/config"
import tmdbApi from "./tmdbApi.js";


export async function getProviders(language: string, watch_region: string){
    const params = {
        language,
        watch_region
    }

    const result = await tmdbApi.get("/watch/providers/movie", {
        params
    });

    const providers = result.data.results;
    
    const filteredProviders = providers.map((provider) => {
        const {provider_name, provider_id, logo_path} = provider;

        return {provider_name, provider_id, logo_path};
    })

    return filteredProviders;
}