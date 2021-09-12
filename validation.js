const {body, validationResult} = require('express-validator');

const validateMessage = [
    body('email', 'This field is required')
        .trim()
        .isLength({ min: 1 }),
    body('email', 'Invalid email')
        .trim()
        .isEmail(),
    body('message', 'This field is required')
        .trim()
        .isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.json(errors.array({onlyFirstError: true }));
        }
        next();
}];

module.exports = validateMessage;