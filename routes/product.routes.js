const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsProductById, isExistsCategorieById } = require('../helpers/db-validators')

const { 
    validatorFields,
    validateJWT, 
    permitRole
} = require('../middlewares');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/product.controller')
const router = Router();

/**
 * {{url}}/api/products
 */

router.get('/', getProducts)


router.get('/:id',[
    check('id', 'Formato de id no es válido').isMongoId(),
    check('id').custom(isExistsProductById),
    validatorFields
]
,getProduct)

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Debe enviar un id de categoria').not().isEmpty(),
    check('categoria').custom(isExistsCategorieById),
    check('descripcion','Debe ingresra la descripción del producto').not().isEmpty(),
    validatorFields
]
, createProduct)

router.put('/:id',[
    validateJWT,
    check('id', 'Formato de id no es válido').isMongoId(),
    check('id').custom(isExistsProductById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Debe enviar un id de categoria').not().isEmpty(),
    check('categoria').custom(isExistsCategorieById),
    check('descripcion','Debe ingresra la descripción del producto').not().isEmpty(),
    validatorFields
], updateProduct)

router.delete('/:id',[
    validateJWT,
    permitRole('ADMIN_ROLE'),
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(isExistsProductById),    
    validatorFields
], deleteProduct)



module.exports = router;