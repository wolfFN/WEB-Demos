const fs = require('fs');
const DB = require('./db');

class Posts {
    constructor() {
        this.posts = [];
        console.log('Posts construct');
    }

    async detail(ctx) {
        let key = ctx.params.key;

        let images = await DB.queryImages(key);
        if (!images || images.length == 0) {
            ctx.response.type = 'html';
            ctx.response.body = fs.createReadStream('./dist/views/index.html');
        }

        let title = images[0].title;
        let urls = images.map(img=>img.url);
        await ctx.render('./views/detail.html', {title,urls});
    };

    async postLists(ctx) {
        const version = '1';
        this.posts = this.posts.length == 0
            ? await DB.getAllPosts()
            : this.posts;
        let query = ctx.query;
        let page = parseInt(query.page) || 1;
        let results = parseInt(query.results) || 10;
        let startIndex = results * (page - 1);
        let total = this.posts.length;

        ctx.response.type = 'json';
        ctx.response.body = {
            info: {
                page,
                results,
                total,
                version
            },
            results: this
                .posts
                .slice(startIndex, startIndex + 10)
        };
    }

    async imageLists(ctx) {
        const version = '1';
        let key = ctx.params.key;
        let images = await DB.queryImages(key);


        let type = images[0] ? images[0].type : '';
        let title = images[0] ? images[0].title : '';

        // 提取urls并去重, TODO: 数据库清洗
        let imageUrls = images.map(image => image.url);
        imageUrls = imageUrls.filter((item, index) => {
            return imageUrls.indexOf(item) === index;
        });
        let total = imageUrls.length;
        ctx.response.type = 'json';

        ctx.response.body = {
            info: {
                key,
                type,
                title,
                total,
                version
            },
            results: imageUrls
        };
    }




}

module.exports = {
    Posts
};