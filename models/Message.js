const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbconnect');

class Message extends Model{}

Message.init({
    email:{
        type: DataTypes.STRING
    },
    message:{
        type: DataTypes.STRING(3000)
    }
}, {
    sequelize,
    modelName: 'message'
});

module.exports = Message;