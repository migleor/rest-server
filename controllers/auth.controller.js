const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
       
        const user = await User.findOne({ email });
    
        if(!user){
            return res.status(400).json({
                msg: 'Error al loguear el usuario'
            })
        }
    
        if(!user.status){
            return res.status(400).json({
                msg: 'Error al loguear el usuario!!!'
            })
        }
    
        const validatePasswd = bcryptjs.compareSync(password, user.password);
    
        if(!validatePasswd){
            return res.status(400).json({
                msg: 'Error al loguear el usuario!!'
            })
        }
    
        const token = await generarJWT(user.id);

        res.json({
            msg:"Login OK",
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error!!! '+ error
        })
    }


}

module.exports = {
    login
}