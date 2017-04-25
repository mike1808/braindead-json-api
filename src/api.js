const fs = require('fs-promise');
const path = require('path');
const STATUS_CODES = require('http').STATUS_CODES;

const JSON_EXT = '.json';

class HTTPError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

class NotFountError extends HTTPError {
    constructor(message = STATUS_CODES[401]) {
        super(404, message);
    }
}

class NotImpelemtedError extends HTTPError {
    constructor(message = STATUS_CODES[501]) {
        super(501, message);
    }
}

function normalizePath(p) {
    p = path.normalize(p);
    if (p[p.length - 1] === '/') {
        p = p.slice(0, -1);
    }

    return p;
}

function getJsonPath(apiFolder, reqPath) {
    return path.join(apiFolder, normalizePath(reqPath) + JSON_EXT);
}

async function parseJsonIfExists(jsonPath) {
    let json;
    try {
        json = await fs.readFile(jsonPath);
    }
    catch (ex) {
        throw new NotFountError();
    }

    return JSON.parse(json);
}

async function update(object, jsonPath, update) {
    const updated = Object.assign(object, update);
    await fs.writeFile(jsonPath, JSON.stringify(updated, ' ', 2));
    return update;
}

async function replace(object, jsonPath, update) {
    await fs.writeFile(jsonPath, JSON.stringify(update, ' ', 2));
    return update;
}

async function identity(arg) {
    return arg;
}

const methodsToFunctions = {
    GET: identity,
    PATCH: update,
    PUT: replace,
};

function matchRoute(path, method, routes) {
    return routes.find(route => route.route === path && route.method === method);
}

exports.createMiddleware = function (apiPrefix, apiFolder, { updateMethod, replaceMethod }, routes = []) {
    methodsToFunctions[updateMethod] = update;
    methodsToFunctions[replaceMethod] = replace;

    return async function (ctx, next) {
        if (ctx.path.indexOf(apiPrefix) !== 0) {
            throw new NotFountError();
        }

        const p = ctx.path.slice(apiPrefix.length);

        const route = matchRoute(p, ctx.method.toUpperCase(), routes);

        if (route) {
            const jsonPath = getJsonPath(apiFolder, route.response);
            ctx.body = await parseJsonIfExists(jsonPath);
            ctx.statusCode = route.statusCode || 200;
            return;
        }

        const jsonPath = getJsonPath(apiFolder, p);

        const json = await parseJsonIfExists(jsonPath);
        const func = methodsToFunctions[ctx.method.toUpperCase()];

        if (!func) {
            throw new NotImpelemtedError();
        }

        ctx.body = await func(json, jsonPath, ctx.request.body);
    }
};

exports.errorHandler = async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        console.error(err);
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};
