var jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {
    console.log(uid);
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_KEY_JWT, {
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.log('Error al generar el token', err );
                reject('Error al generar el token')
            } else {
                resolve( token )
            }
        });
    });
}

module.exports = {
    generarJWT
}