const http = require('http');
const Koa = require('koa');
const favicon = require('koa-favicon');
const cors = require('kcors');
const body = require('koa-body');
const logger = require('koa-logger');

const api = require('./api');

module.exports = function ({ ip, port, apiPrefix, apiFolder, updateMethod, replaceMethod, log, routes }) {
    const app = new Koa();

    app.use(favicon(__dirname + '/public/js.png'));

    if (log) {
        app.use(logger());
    }

    app.use(cors());
    app.use(body());
    app.use(api.errorHandler);
    app.use(api.createMiddleware(apiPrefix, apiFolder, { updateMethod, replaceMethod }, routes));

    http.createServer(app.callback()).listen(3000).listen(ip, port, (err) => {
        if (err) console.log(`Cannot start server on ${ip}:${port}`);
        console.log(`JSON API is listening on ${ip}:${port}`);
    });
};

