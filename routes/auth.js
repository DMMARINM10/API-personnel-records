const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.js');
const { validate } = require('../middlewares/validate');

const router = Router();

router.post('/login', [

    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The e-mail is required').not().isEmpty(),
    check('email', 'the e-mail is not valid').isEmail(), 
    validate

], login);



module.exports = router;