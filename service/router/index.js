const Router = require('koa-router');
const Jiandan = require('./jiandan');
const jiandan = new Jiandan();

const router = new Router();
router.get('/jiandan/imgs',jiandan.postLists.bind(jiandan));


module.exports = router;

