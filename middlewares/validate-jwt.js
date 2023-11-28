var jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay Token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.uid = uid;

        userAuthenticated = await User.findById(uid);

        if(!userAuthenticated || !userAuthenticated.status ){
            return res.status(401).json({
                msg: 'Usuario no autorizado para esta operación'
            })
        }

        req.userAuthenticated = userAuthenticated;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        })        
    }


}

module.exports = {

    validateJWT

}