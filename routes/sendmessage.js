const router = require('express').Router();
const Message = require('../models/Message');
const validateMessage = require('../validation');

router.post('/sendmessage', validateMessage, async (req, res) => {
    Message.create(req.body).then(() => res.json('')).catch(error => console.log(error));
})

module.exports = router;