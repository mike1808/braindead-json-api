const Koa = require('koa');
const favicon = require('koa-favicon');

const config = require('./config');
const folderApi = require('./folder-api');
const app = new Koa();


app.use(favicon(__dirname + '/public/js.png'));
app.use(folderApi.errorHandler);
app.use(folderApi.middleware);


const port = config.port;
app.listen(port, (err) => {
    if (err) console.log(`Cannot start server on ${port}`);
    console.log(`JSON API is listening on ${port}`);
});