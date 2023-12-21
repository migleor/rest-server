const dbValidators  = require('./db-validators');
const generateJWT   = require('./jwt');
const googleVerify  = require('./google-verify');
const uploaderFiles = require('./uploader-files');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploaderFiles,    
}