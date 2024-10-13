import { saveIfNoExistsProvider } from "../app/services/orm/providerORM.js";
import AppDataSource from "../app/data-source.js";

// Sample provider data
const sampleProviders = [
    { provider_id: 1, provider_name: 'Provider One', logo_path: '/path/to/logo1.png' },
    { provider_id: 2, provider_name: 'Provider Two', logo_path: '/path/to/logo2.png' },
    { provider_id: 3, provider_name: 'Provider Three', logo_path: '/path/to/logo3.png' }
];

async function testSaveIfNoExistsProvider() {
    try {
        // Call the function with sample data
        const newProviders = await saveIfNoExistsProvider(sampleProviders);

        // Log the results
        console.log('New providers saved:', newProviders);
    } catch (error) {
        console.error('Error testing saveIfNoExistsProvider:', error);
    }
}

// Run the test
testSaveIfNoExistsProvider();