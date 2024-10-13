import {Provider} from "../../entity/Provider.js";
import AppDataSource from "../../data-source.js";
import {getProviders} from "../fetcher/providersFetcher";
import {User} from "../../entity/User.js";

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
export async function saveUserProviders(userId: number, providerIds: number[]) {
    const userRepo = AppDataSource.getRepository(User);
    const providerRepo = AppDataSource.getRepository(Provider);

    // Find the user
    const user = await userRepo.findOne({ where: { id: userId }, relations: ["providers"] });

    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    // Find the providers
    const providers = await providerRepo.findByIds(providerIds);

    if (providers.length !== providerIds.length) {
        throw new Error(`Some providers not found`);
    }

    // Set the user's providers
    user.providers = providers;

    // Save the user with the new providers
    await userRepo.save(user);

    return user;
}

/**
 * Fetch a user with their providers by user ID
 */
export async function getUserWithProviders(userId: number) {
    const userRepo = AppDataSource.getRepository(User);
    const userWithProviders = await userRepo.findOne({ where: { id: userId }, relations: ["providers"] });

    if (!userWithProviders) {
        throw new Error("User not found");
    }

    return userWithProviders;
}