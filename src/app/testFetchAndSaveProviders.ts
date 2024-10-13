import { getProviders } from './services/fetcher/providersFetcher.js';
import { saveIfNoExistsProvider } from './services/orm/providerORM.js';
import AppDataSource from './data-source.js';

async function testFetchAndSaveProviders() {
    try {
        // Initialize the data source
        await AppDataSource.initialize();

        // Fetch providers
        const language = 'fr-FR';
        const watch_region = 'BE';
        const providers = await getProviders(language, watch_region);

        // Save providers if they don't exist
        const newProviders = await saveIfNoExistsProvider(providers);

        // Log the results
        console.log('Fetched providers:', providers);
        console.log('New providers saved:', newProviders);
    } catch (error) {
        console.error('Error testing fetch and save providers:', error);
    } finally {
        // Destroy the data source to close the connection
        await AppDataSource.destroy();
    }
}

// Run the test
testFetchAndSaveProviders();