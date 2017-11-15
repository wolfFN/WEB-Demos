// http://docs.sequelizejs.com/manual/installation/getting-started
const Sequelize = require('sequelize');
const DBConfig = require('./db-config').DBConfig;

const sequelize = new Sequelize(DBConfig.Database, DBConfig.UserName, DBConfig.PassWord, {
    host: DBConfig.Host,
    dialect: DBConfig.Dialect,

    logging: false,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


const Posts = sequelize.define('cl_posts', {
    key: {
        type: Sequelize.INTEGER,
        unique: true
    },
    type: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    href: {
        type: Sequelize.STRING
    },
    imageCount: {
        type: Sequelize.INTEGER
    },
    isParsed: {
        type: Sequelize.BOOLEAN
    },
});

async function getAllPosts() {
    let unparsedPosts = await Posts.findAll();
    console.log(`Get total ${unparsedPosts.length} posts`);

    return unparsedPosts;
}

async function queryPost(key) {
    let post = await Posts.find({
        where: {
            key: key
        }
    });
    return post;
}

const Images = sequelize.define('cl_images', {
    key: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    }
});

async function queryImages(key) {
    let images = await Images.findAll({
        where: {
            key: key
        }
    });
    return images;
}

module.exports = {
    queryPost,
    getAllPosts,
    queryImages,
};

// (async() => {
//     // let posts = await getAllUnparsedPosts();
//     let posts = await queryImages(2759700);

//     console.log(posts.length);
// })();


