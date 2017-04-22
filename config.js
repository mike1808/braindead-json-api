require('dotenv').config();

module.exports = {
    port: +process.env.BJA_PORT || 3000,
    apiPrefix: process.env.BJA_API_PREFIX || '/api',
    apiFolder: process.env.BJA_API_FOLDER || './db',
};
