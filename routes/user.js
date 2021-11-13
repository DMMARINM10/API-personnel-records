const {Router} = require('express');
const { check } = require('express-validator');

const { usersGet, 
        usersPut, 
        usersPost,
        usersDelete,
        usersGetId
    } = require('../controllers/users');
const { 
    emailExists,
    existUserById,
    statusFalse
} = require('../helpers/db-validators');

const {  validate } = require('../middlewares/validate');
const { authoUser } = require('../middlewares/validate-authorizedUser');
const { validateJWT } = require('../middlewares/validate-jwt');
const { adminRole } = require('../middlewares/validate-roles');

const router = Router();

router.get('/', [
    validateJWT,
    adminRole,
    validate
], usersGet);

router.get('/:uid', [
   validateJWT,
   authoUser,
   check('uid').custom(statusFalse),
   validate
], usersGetId);

router.put('/:uid', [
   validateJWT,
   authoUser,
   check('uid').custom( existUserById ),
   check('uid').custom( statusFalse ),
   check('password', 'password must contain at least 8 characters').isLength({min: 8}), 
   check('email', 'the e-mail is not valid').isEmail(), 
   check('email').custom( emailExists ),
   validate
], usersPut);

router.post('/', [
   check('name', 'name is required').not().isEmpty(),
   check('password', 'password must contain at least 8 characters').isLength({min: 8}), 
   check('email', 'the e-mail is not valid').isEmail(), 
   check('email').custom( emailExists ),
   check('role', 'It is not a valid role').isIn(['ADMIN', 'USER']),  
   validate

], usersPost);

router.delete('/:uid', [
   validateJWT,
   adminRole,
   check('uid').custom( existUserById ), 
   check('uid').custom(statusFalse),
   validate
], usersDelete);



module.exports = router;