const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validatorFields } = require('../middlewares/validatorFields');

const router = Router();

router.post( '/login',[
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('email', 'Email ingresado no es valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validatorFields
] ,login );

module.exports = router;
