const fs = require('fs');
const DB = require('./db');

class Posts {
    constructor() {
        console.log('Posts construct');
    }

    async lists(ctx) {
        const posts = await DB.getAllPosts();
        let query = ctx.query;
        let startIndex = parseInt(query.startIndex) || 0;

        ctx.response.type = 'json';
        ctx.response.body = {
            startIndex,
            count: 10,
            data: posts.slice(startIndex, startIndex + 10)
        };
    }
}

module.exports = {
    Posts
}