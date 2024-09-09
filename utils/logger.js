const colors = require('colors');

const logSuccess = (message, ...args) => {
    console.log(colors.green(message), ...args);
};

const logError = (message, ...args) => {
    console.error(colors.red(message), ...args);
};

const logInfo = (message, ...args) => {
    console.log(colors.blue(message), ...args);
};

module.exports = { logSuccess, logError, logInfo };
