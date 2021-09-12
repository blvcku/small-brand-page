const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.authtoken;
    if(!token || token === undefined){
        res.redirect('/admin');
        res.status(401).send();
        return;
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if(req.user._id === process.env.ADMIN_ID){
            next();
        }
        else{
            res.redirect('/admin');
            res.status(401).send();
        }
    }
    catch(error){
        res.redirect('/admin');
        res.status(401).send();
    }
}