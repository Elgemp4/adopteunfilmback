import {Provider} from "../../entity/Provider.js";
import AppDataSource from "../../data-source.js";
import {getProviders} from "../fetcher/providersFetcher";

/**
 * Add providers in the repository if they aren't already added
 */
export async function saveIfNoExistsProvider(providers) {
    const newProviders = [];

    const providerRepo = AppDataSource.getRepository(Provider);

    for (const provider of providers) {
        const existingProvider = await providerRepo.findOneBy({ provider_id: provider.provider_id });

        if (!existingProvider) {
            const newProvider = providerRepo.create({
                provider_id: provider.provider_id,
                name: provider.provider_name,
                logo_path: provider.logo_path
            });

            await providerRepo.save(newProvider);
            newProviders.push(newProvider);
        }
    }

    return newProviders;
}

/**
 * Save the user's providers (and override previous providers)
 */
export async function saveUserProviders() {

}