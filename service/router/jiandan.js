const { getAllImages } = require('../dao/jiandanDB')

class Jiandan {
    constructor() {
        this.allImages = [];
        console.log('Jiandan construct');
    }

    // query: offset, size
    async postLists(ctx) {
        const version = '1';

        this.allImages = this.allImages.length == 0
            ? await getAllImages()
            : this.allImages;

        const { offset = 0, size = 20, type='' } = ctx.query;

        const imgs = this.allImages
            .filter(
                img => img.type && img.type.includes(type)
            );

        const total = imgs.length;

        ctx.response.type = 'json';
        ctx.response.body = {
            info: {
                version,
                offset,
                size,
                total
            },
            results: imgs.slice(offset, offset + size)
        };
    }
}

module.exports = Jiandan;