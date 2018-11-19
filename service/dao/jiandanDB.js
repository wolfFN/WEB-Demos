const Sequelize = require('sequelize');
const sequelize = require('./db');

const JiandanImgs = sequelize.define('jiandan_imgs', {
    key: {
        type: Sequelize.STRING,
        unique: true
    },
    type: {
        type: Sequelize.STRING
    },
    thumb: {
        type: Sequelize.STRING
    },
    src: {
        type: Sequelize.STRING
    }
});

async function getAllImages() {
    const imgs = await JiandanImgs.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`Get total ${imgs.length} posts`);

    return imgs;
}

module.exports = {
    getAllImages
};
