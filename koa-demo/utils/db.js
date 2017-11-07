// http://docs.sequelizejs.com/manual/installation/getting-started
const Sequelize = require('sequelize');
const Config = require('./db-config');

const DBConfig = Config.DBConfig;

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

async function addPost(data) {

    let [posts, created] = await Posts
        .findOrCreate({
            where: {
                key: data.key
            },
            defaults: {
                isParsed: false
            }
        });

    if (!created) {
        console.log(data.key + ' already exists!');
    }

    await updatePost(data);

}

async function getAllPosts() {
    let unparsedPosts = await Posts.findAll();
    return unparsedPosts;
}

async function getAllUnparsedPosts() {
    let unparsedPosts = await Posts.findAll({
        where: {
            isParsed: false
        }
    });
    return unparsedPosts;
}

async function updatePost(data) {
    var selector = {
        where: {
            key: data.key
        }
    }

    await Posts
        .update(data, selector)
        .catch((error) => {
            console.log('update post error: ' + error);
        });
}

async function queryPost(key) {
    let post = await Posts.find({
        where: {
            key: key
        }
    });
    return post;
}

async function getAllUnparsedPosts() {
    let unparsedPosts = await Posts.findAll({
        where: {
            isParsed: false
        }
    });
    return unparsedPosts;
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

async function addImage(data) {
    return Images.create(data);
}

// const data = {
//     key: 123,
//     url: 'www.baidu.com',
//     title: '百度',
//     type: '100'
// };

// addImage(data);

async function queryImages(key) {
    let image = await Images.find({
        where: {
            key: key
        }
    });
    return image;
}


module.exports = {
    addPost,
    updatePost,
    queryPost,
    getAllUnparsedPosts,
    getAllPosts,
    addImage,

};

// 删除旧表，建立新表
// Posts.sync({force: true});
// Images.sync({force: true});

// Posts.sync({force: false}).then(() => {
//     return Posts.create({
//         key: 123,
//         url: 'www.baidu.com',
//         title: '百度',
//         imageCount: '100',
//         isParsed: 'false'
//     })
// });



// const data = {
//     key: 2759657,
//     type: "動漫",
//     title: '[疾风享]美臀收集俯身待君入4 [30P]',
//     href: 'htm_data/8/1711/2759657.html',
//     imageCount: 30
// };


// updatePost(data);


// Posts.findAll().then(posts => {
//   console.log('posts length: ' + posts.length);
// });

// (async() => {
//     // let posts = await getAllUnparsedPosts();
//     let posts = await getAllPosts();
//     console.log(posts.length);
// })();