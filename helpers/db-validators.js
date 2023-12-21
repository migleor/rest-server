const {Role, User, Categorie, Product }= require('../models/');

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

const isExistsCategorieById = async(id) => {
    const categorie = await Categorie.findById(id);

    if(!categorie){
        throw new Error(`Id Inválido`)
    }
}

const isExistsProductById = async(id) => {
    const product = await Product.findById(id);

    if(!product){
        throw new Error('Id Inválido')
    }
}

//validar colecciones permitidas
const permitCollections = (colection= '', colections = []) => {

    if(!colections.includes(colection)){
        throw new Error(`Colección no permitida ${collections}`)
    }

    return true;
}

module.exports = {
    isValidRole,
    isMailExists,
    isExistsUserById,
    isExistsCategorieById,
    isExistsProductById,
    permitCollections
}