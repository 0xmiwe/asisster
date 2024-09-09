const axios = require('axios');
const { logSuccess, logError } = require('../utils/logger');

const claimDailyPoints = async (headers) => {
    const url = `${process.env.BASE_URL}/users/me/daily_points/`;
    try {
        const response = await axios.post(url, {}, { headers });
        logSuccess('Claim successful:');
        logSuccess('Response:', response.data);

        const points = response.data.points || 0;
        const roundedPoints = Math.round(points / 100) * 100;

        logSuccess('Points Claimed:', roundedPoints);
    } catch (error) {
        logError('Claim failed:');
        logError('Error Message:', error.response ? error.response.data : error.message);
    }
};

const getAccountData = async (headers) => {
    const url = `${process.env.BASE_URL}/users/me/`;
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        logError('Failed to fetch account data:');
        logError('Error Message:', error.response ? error.response.data : error.message);
        return null;
    }
};

module.exports = { claimDailyPoints, getAccountData };
