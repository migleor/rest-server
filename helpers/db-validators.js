const Role = require('../models/rol');
const User = require('../models/user');

const isValidRole = async ( role= '' ) =>{
    const roleExists = await Role.findOne({ rol: role });
    if(!roleExists){
        throw new Error('El rol enviado no existe en la lista!!')
    }
};

const isMailExists = async (email) => {
    const mailExists = await User.findOne({email});

    if(mailExists){
        throw new Error(`El correo ${email} ya se encuentra registrado`)
    }    
}

const isExistsUserById = async(userId) => {
    const user = await User.findById(userId);

    if(!user){
        throw new Error(`Id invalido`);
    }
}

module.exports = {
    isValidRole,
    isMailExists,
    isExistsUserById
}