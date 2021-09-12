const router = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');
const Message = require('../models/Message');

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../', '/admin_panel/admin.html'));
})

router.post('/login', (req, res) => {
    if(req.body.password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({_id:process.env.ADMIN_ID}, process.env.TOKEN_SECRET, {expiresIn:'15m'});
        res.cookie('authtoken', token, {httpOnly:true, secure:false, sameSite:'Strict'});
        res.send();
    }
    else{
        res.status(401).send('Invalid password');
    }
})

router.get('/panel', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/admin_panel/panel.html'));
})

router.get('/panel/messages', verifyToken, async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
})

module.exports = router;