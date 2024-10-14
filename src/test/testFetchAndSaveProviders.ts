import { getProviders } from '../app/services/provider/providersProvider.js';
import { saveIfNoExistsProvider } from '../app/services/store/providerStore.js';
import AppDataSource from '../app/data-source.js';

async function testFetchAndSaveProviders() {
    try {
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
    }
}

// Run the test
testFetchAndSaveProviders();