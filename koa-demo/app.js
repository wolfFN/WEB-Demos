const fs = require('fs');
const route = require('koa-route');
// const path = require('path');
// const serve = require('koa-static');
const Koa = require('koa');
const Posts = require('./utils/posts');

const app = new Koa();
const posts = new Posts.Posts();


const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./dist/index.html');
};

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./dist/about.html');
};

// app.use(serve(path.join(__dirname + '/static')));
app.use(route.get('/', main));
app.use(route.get('/about', about));
app.use(route.get('/posts', posts.lists));
// app.use(route.get('/posts/:key', posts.detail));
app.listen(3000);