const { Router } = require('express');
const { 
    getUsers,
    storeUser,
    deleteUser,
    updateUser,
    patchUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validatorFields');
const { isValidRole, isMailExists, isExistsUserById } = require('../helpers/db-validators');

const router = Router();

router.get( '/', getUsers );

router.post('/', [
    check('nombre', 'El campo nombre es obligarorio').not().isEmpty(),
    check('password', 'El password es obligatorio y con mas de 7 carácteres').isLength({min:7}),
    check('email', 'Email ingresado no es valido').isEmail(),
    check('email').custom(isMailExists),
    check('role').custom(isValidRole),
    validatorFields
],storeUser);

router.put('/:userId',[
    check('userId', 'No es un ID Valido').isMongoId(),
    check('userId').custom(isExistsUserById),
    check('nombre', 'El campo nombre es obligarorio').not().isEmpty(),
    check('password', 'El password es obligatorio y con mas de 7 carácteres').isLength({min:7}),
    check('email', 'Email ingresado no es valido').isEmail(),
    check('email').custom(isMailExists),
    check('role').custom(isValidRole),    
    validatorFields 
] ,updateUser );

router.delete('/:userId', [
    check('userId', 'No es un ID Valido').isMongoId(),
    check('userId').custom(isExistsUserById),    
    validatorFields
], deleteUser); 

module.exports = router;