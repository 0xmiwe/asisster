require('dotenv').config(); // Load environment variables
const { displayHeader } = require('./utils/display');
const { readAuthTokens } = require('./api/auth');
const { claimDailyPoints, getAccountData } = require('./api/requests');
const { logInfo, logError } = require('./utils/logger');

displayHeader();

const main = async () => {
    while (true) {
        try {
            const tokens = readAuthTokens(process.env.FILE_NAME);
            if (tokens.length === 0) return; // Exit if no tokens are found
            
            for (const token of tokens) {
                const headers = { Authorization: `Bearer ${token}` };

                logInfo('=== Processing Account ===');
                
                logInfo('Attempting to claim daily points...');
                await claimDailyPoints(headers);

                const accountData = await getAccountData(headers);
                if (accountData) {
                    console.log('\n--------------------');
                    console.log(`Username: ${accountData.username || 'N/A'}`);
                    console.log('--------------------\n');
                } else {
                    logError('No account data received or failed to fetch account data.');
                }
                
                logInfo('Pausing for 10 seconds before processing the next account...\n');
                await new Promise(resolve => setTimeout(resolve, 10000));
            }

            logInfo('All accounts processed. Pausing for 13 hours before starting again...\n');
            await new Promise(resolve => setTimeout(resolve, 46800000)); // 13 hours in milliseconds
        } catch (err) {
            logError('An unexpected error occurred:', err.message);
            // Optionally exit or break from the loop depending on the error
            break;
        }
    }
};

main();
