const  validatorFields  = require('../middlewares/validatorFields');
const validateJWT   = require('../middlewares/validate-jwt');
const validateRole  = require('../middlewares/validat-role');

module.exports = {
    ...validatorFields,
    ...validateJWT,
    ...validateRole,
}