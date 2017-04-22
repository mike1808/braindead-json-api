const http = require('http');
const Koa = require('koa');
const favicon = require('koa-favicon');
const cors = require('kcors');

const folderApi = require('./folder-api');

module.exports = function ({ ip, port, apiPrefix, apiFolder }) {
    const app = new Koa();

    app.use(favicon(__dirname + '/public/js.png'));
    app.use(cors());
    app.use(folderApi.errorHandler);
    app.use(folderApi.createMiddleware(apiPrefix, apiFolder));

    http.createServer(app.callback()).listen(3000).listen(ip, port, (err) => {
        if (err) console.log(`Cannot start server on ${ip}:${port}`);
        console.log(`JSON API is listening on ${ip}:${port}`);
    });
};

