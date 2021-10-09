const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('messages', 'admin', process.env.DB_PASSWORD, {
    dialect: 'sqlite',
    host: './messages.sqlite'
});

module.exports = sequelize;