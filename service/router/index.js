const Router = require('koa-router');
const Jiandan = require('./jiandan');
const jiandan = new Jiandan();

const router = new Router({
    prefix: '/api'
  });
router.get('/jiandan/imgs',jiandan.postLists.bind(jiandan));


module.exports = router;

