const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {

    const { limit = 5, page = 0 } = req.query;

    const [totalUsers, users] = await Promise.all([
        User.countDocuments({status: true}),
        User.find({status: true})
        .skip(Number(page))
        .limit(Number(limit))        
    ]);

    res.json({
        totalUsers,
        page,
        users
    });
};

const storeUser = async (req, res) => {

    const {	nombre,email,password,role } = req.body;
    const user = new User({
        nombre,
        email,
        password,
        role
    });

    //encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    try {
        await user.save();
        res.json({
            msg: 'Usuario creado exitosamente',
            user
        });        
    } catch (error) {
        console.log('Error el insertar el registro', error);
    }

};
const deleteUser = async (req, res) => {
    const id = req.params.userId;

    const userDb = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        msg: 'Usuario Borrado exitosamente'
    });
};
const updateUser = async (req, res) => {

    const id = req.params.userId;
    const { _id, password, google, correo, ...data } = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);        
    }

    const userDb = await User.findByIdAndUpdate(id, data);

    res.json({
        msg: 'Usuario Actualizado Exitosamente',
        userDb
    });
};


module.exports = { 
    getUsers,
    storeUser,
    deleteUser,
    updateUser
 };