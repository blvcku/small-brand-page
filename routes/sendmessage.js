const router = require('express').Router();
const Message = require('../models/Message');
const validateMessage = require('../validation');

router.post('/sendmessage', validateMessage, async (req, res) => {
    const message = new Message({
        email: req.body.email,
        message: req.body.message
    });
    try{
        const savedMessage = await message.save();
        res.json('');
    }
    catch(error){
        console.log('ERROR: ' + error);
    }
})

module.exports = router;