const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const cors = require('koa2-cors');
const views = require('koa-views')

const router = require('./utils/router');

const app = new Koa();


app.use(views(path.join(__dirname, './dist'), {
    map: {
        html: 'ejs'
    }
}));

app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {     return "*"; // 允许来自所有域名请求 }
        console.log(ctx.url);
        return '*';
    },
    exposeHeaders: [
        'WWW-Authenticate', 'Server-Authorization'
    ],
    maxAge: 5,
    credentials: true,
    allowMethods: [
        'GET', 'POST', 'DELETE'
    ],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(serve(path.join(__dirname + '/dist')));


app.use(router.routes());
app.listen(3000);