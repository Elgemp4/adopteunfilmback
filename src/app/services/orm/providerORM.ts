import {Provider} from "../../entity/Provider.js";
import AppDataSource from "../../data-source.js";
import {getProviders} from "../fetcher/providersFetcher";
import {User} from "../../entity/User.js";
import {In} from "typeorm";

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
export async function saveUserProviders(user: User, providerIds: number[]) {
    const userRepo = AppDataSource.getRepository(User);
    const providerRepo = AppDataSource.getRepository(Provider);

    const providers = await providerRepo.find({ where: { provider_id: In(providerIds) } });

    if (providers.length !== providerIds.length) {
        throw new Error(`Some providers not found`); //TODO : Ne pas rejeter l'erreur tout de suite, d'abord demander à TMDB pour le fournisseur
    }

    user.providers = providers;

    await userRepo.save(user);

    return user;
}

/**
 * Fetch the providers of the user
 */
export async function getUserProviders(userId: number) {
    const userRepo = AppDataSource.getRepository(User);
    const userWithProviders = await userRepo.findOne({ where: { id: userId }, relations: ["providers"] });

    if (!userWithProviders) {
        throw new Error("User not found");
    }

    return userWithProviders.providers;
}