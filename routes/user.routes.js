const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getUsers,
    storeUser,
    deleteUser,
    updateUser } = require('../controllers/user.controller');


const { isValidRole, isMailExists, isExistsUserById } = require('../helpers/db-validators');
const { 
    validatorFields,
    validateJWT,
    validateRole,
    permitRole
} = require('../middlewares');

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
    validateJWT,
    //validateRole,
    permitRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('userId', 'No es un ID Valido').isMongoId(),
    check('userId').custom(isExistsUserById),    
    validatorFields
], deleteUser); 

module.exports = router;