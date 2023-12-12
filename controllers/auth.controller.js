const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, picture, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        console.log(user);

        if(!user){
            const data = {
                nombre,
                email,
                password: '-',
                isgoogle: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();
        }

        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario no autorizado',
            });            
        }

        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });
    
    } catch (error) {
        res.status(400).json({
            msg: `Error!! ${error}`,
        });
    }

}

module.exports = {
    login,
    googleSignIn
}