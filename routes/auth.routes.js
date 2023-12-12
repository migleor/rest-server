const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validatorFields } = require('../middlewares/validatorFields');

const router = Router();

router.post( '/login',[
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('email', 'Email ingresado no es valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validatorFields
] ,login );

router.post( '/google',[
    check('id_token', 'Token es necesario!!!').not().isEmpty(),
    validatorFields
] ,googleSignIn);

module.exports = router;
