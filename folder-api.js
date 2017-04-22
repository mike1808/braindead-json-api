const fs = require('fs-promise');
const path = require('path');
const config = require('./config');


const JSON_EXT = '.json';

class HTTPError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

class NotFountError extends HTTPError {
    constructor(message = 'Not Found') {
        super(404, message);
    }
}

function normalizePath(p) {
    p = path.normalize(p);
    if (p[p.length - 1] === '/') {
        p = p.slice(0, -1);
    }

    return p;
}

async function serveJson(reqPath) {
    try {
        const p = path.join(config.apiFolder, normalizePath(reqPath) + JSON_EXT);
        const json = await fs.readFile(p);
        return JSON.parse(json);
    }
    catch (ex) {
        throw new NotFountError();
    }
}

exports.middleware = async function (ctx, next) {
    if (ctx.path.indexOf(config.apiPrefix) !== 0) {
        throw new NotFountError();
    }

    const p = ctx.path.slice(config.apiPrefix.length);

    ctx.body = await serveJson(p);
};

exports.errorHandler = async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};
