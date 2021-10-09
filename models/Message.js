const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbconnect');

class Message extends Model{}

Message.init({
    email:{
        type: DataTypes.STRING
    },
    message:{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'message'
});

module.exports = Message;