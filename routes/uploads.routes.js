const { Router } = require('express');

const { uploadFiles, updateImagesCollections, regresarImagen } = require('../controllers/uploads.controller');
const { check } = require('express-validator');
const { validatorFields, validateUploads } = require('../middlewares');
const { permitCollections, isExistsUserById } = require('../helpers');

const router = Router();

router.post('/',validateUploads, uploadFiles )

router.put('/:collection/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('collection').custom( c => permitCollections(c, ['users', 'products'])),
    validateUploads,
    validatorFields
], updateImagesCollections)

router.get('/:collection/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('collection').custom( c => permitCollections(c, ['users', 'products'])),
    validatorFields    
], regresarImagen)

module.exports = router;