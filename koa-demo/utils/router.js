const fs = require('fs');

const Router = require('koa-router');
const Posts = require('./posts');
const posts = new Posts.Posts();


const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./dist/views/index.html');
};

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./dist/views/about.html');
};


let router = new Router();

// page routes
router.get('/', main);
router.get('/about', about);
router.get('/static/:key', posts.detail);

// restful api
router.get('/posts',posts.postLists.bind(posts));
router.get('/posts/:key', posts.imageLists);


module.exports = router;