import { saveUserProviders } from './services/orm/providerORM.js';
import AppDataSource from './data-source.js';

async function testSaveUserProviders() {
    try {
        // Initialize the data source
        await AppDataSource.initialize();

        // Sample user ID and provider IDs
        const userId = 2; // Replace with an actual user ID from your database
        const providerIds = [10, 542, 538]; // Replace with actual provider IDs from your database

        // Call the function with sample data
        const updatedUser = await saveUserProviders(userId, providerIds);

        // Log the results
        console.log('Updated user with new providers:', updatedUser);
    } catch (error) {
        console.error('Error testing saveUserProviders:', error);
    } finally {
        // Destroy the data source to close the connection
        await AppDataSource.destroy();
    }
}

// Run the test
testSaveUserProviders();