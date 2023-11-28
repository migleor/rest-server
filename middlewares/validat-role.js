const User = require('../models/user');

const validateRole = async (req = request, res = response, next) => {

    try {
        const { role } = req.userAuthenticated;

        if(!req.userAuthenticated){
            return res.status(500).json({
                msg: 'Error al validar el token!!'
            })            
        }

        if(role !== 'ADMIN_ROLE' ){
            return res.status(401).json({
                msg: 'Usuario no tiene privilegios para ejecutar esta operación!!'
            })
        }

        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        })        
    }


}

const permitRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        const { role } = req.userAuthenticated;

        if(!req.userAuthenticated){
            return res.status(500).json({
                msg: 'Error al validar el token!!'
            })            
        }

        if(!roles.includes(role)){
            return res.status(401).json({
                msg: 'Usuario no tiene privilegios para ejecutar esta operación!!'
            })            
        }

        next();
    }
}

module.exports = {

    validateRole,
    permitRole

}