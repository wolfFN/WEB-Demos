const Koa = require('koa');
const router = require('./router');
const app = new Koa();
const logger = require('koa-logger');

app.use(logger());

// error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000);
module.exports = server;
