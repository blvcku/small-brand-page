const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: {
        type: String
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('Message', messageSchema);