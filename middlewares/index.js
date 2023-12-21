const  validatorFields  = require('../middlewares/validatorFields');
const validateJWT   = require('../middlewares/validate-jwt');
const validateRole  = require('../middlewares/validat-role');
const validateUploads = require('../middlewares/validateUploads');

module.exports = {
    ...validatorFields,
    ...validateJWT,
    ...validateRole,
    ...validateUploads,
}