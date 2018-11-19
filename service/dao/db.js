// http://docs.sequelizejs.com/manual/installation/getting-started
const Sequelize = require('sequelize');

const DBConfig = {
    Database: 'nodejs',
    UserName: 'nodejs',
    PassWord: 'nodejs',
    Host: 'localhost',
    Dialect: 'mysql'
};

const sequelize = new Sequelize(
    DBConfig.Database,
    DBConfig.UserName,
    DBConfig.PassWord,
    {
        host: DBConfig.Host,
        dialect: DBConfig.Dialect,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

module.exports = sequelize;
