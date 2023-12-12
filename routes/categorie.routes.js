const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCategorieById } = require('../helpers/db-validators')

const { 
    validatorFields,
    validateJWT, 
    permitRole
} = require('../middlewares/');

const { 
    createCategorie,
    getCategories,
    getCategory,
    updateCategorie, 
    deleteCategorie} = require('../controllers/categorie.controller');


const router = Router();

/**
 * {{url}}/api/categories
 */

//obtener todas la categorias - publico
router.get('/',getCategories)

//obtener una categoria por id - publico
//crear middleware personalizado para validar el id de la categoria (checkIdCategorie)
router.get('/:id',[
    check('id', 'Formato de id no es válido').isMongoId(),
    check('id').custom(isExistsCategorieById),
    validatorFields
]
,getCategory)

//crear categoria - privado con token valido
router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validatorFields
]
, createCategorie)

//actualiza categoria - privado con token valido
router.put('/:id',[
    validateJWT,
    check('id', 'Formato de id no es válido').isMongoId(),
    check('id').custom(isExistsCategorieById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validatorFields
],updateCategorie)

//actualiza categoria - privado solo admin
router.delete('/:id',[
    validateJWT,
    permitRole('ADMIN_ROLE'),
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(isExistsCategorieById),    
    validatorFields    
],deleteCategorie)

module.exports = router;