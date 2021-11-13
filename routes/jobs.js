const { Router, request } = require('express');
const { check } = require('express-validator');
const { jobPost, jobPut, jobDelete, jobGetId, jobGet } = require('../controllers/jobs');
const { validateJWT } = require('../middlewares/validate-jwt');
const { adminRole } = require('../middlewares/validate-roles');
const { validate } = require('../middlewares/validate');
const { existUserById, existUserInJob, paymentDay, statusFalseJob, existJob } = require('../helpers/db-validators');
const { authoUserJob } = require('../middlewares/validate-authorizedUser');


const router = Router();

router.get('/', [
    validateJWT,
    adminRole,
    validate
],  jobGet);

router.get('/:user', [
    validateJWT,
    authoUserJob,
    check('user').custom(statusFalseJob),
    validate
], jobGetId);

router.post('/', [
    validateJWT,
    adminRole,
    check('salary', 'salary is required').not().isEmpty(),
    check('salary', 'salary must be a number').isNumeric(),
    check('totalSalary', 'Total salary is required').not().isEmpty(),
    check('totalSalary', 'Totalsalary must be a number').isNumeric(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('startDate', 'Start date must be a date').isDate(),
    check('endDate', 'End date is required').not().isEmpty(),
    check('endDate', 'End date must be a date').isDate(),
    check('paymentDate', 'Payment day is required').not().isEmpty(),
    check('paymentDate', 'Payment day must be a number').isNumeric(),
    check('paymentDate').custom(paymentDay),
    check('contractType', 'Contract Type is required').not().isEmpty(),
    check('contractType', 'Contract Type is not valid').isIn(['FIXED', 'UNFIXED', 'SERVICES']),
    check('user', 'User id is required').not().isEmpty(),
    check('user').custom(existUserById),
    check('user').custom(existUserInJob),
    validate
], jobPost);

router.put('/:user', [
    validateJWT,
    adminRole,
    check('user').custom(existJob),
    check('user').custom(statusFalseJob),
    check('salary', 'salary must be a number').isNumeric(),
    check('totalSalary', 'Total salary must be a number').isNumeric(),
    check('startDate', 'Start date must be a date').isDate(),
    check('endDate', 'End date must be a date').isDate(),
    check('paymentDate', 'Payment day must be a number').isNumeric(),
    check('paymentDate').custom(paymentDay),
    check('contractType', 'Contract Type is not valid').isIn(['FIXED', 'UNFIXED', 'SERVICES']),
    validate
], jobPut);

router.delete('/:user', [
    validateJWT,
    adminRole,
    check('user').custom( existJob ), 
    check('user').custom(statusFalseJob),
    validate

], jobDelete);
//FIXME: No se puede crear luego de borrar (estado: false)
module.exports = router;