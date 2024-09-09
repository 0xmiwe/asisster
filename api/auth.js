const fs = require('fs');
const { logError } = require('../utils/logger');

const readAuthTokens = (filename) => {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        const tokens = data.split('\n').map(line => line.trim()).filter(line => line !== '');
        if (tokens.length === 0) {
            logError('No tokens found in the file!');
        }
        return tokens;
    } catch (err) {
        logError(`File ${filename} not found!`);
        return [];
    }
};

module.exports = { readAuthTokens };
