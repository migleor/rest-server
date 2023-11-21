const { response } = require('express');

const getUser = (req, res) => {

    const query = req.query;

    res.json({
        msg: 'GET Api Controller!!!',
        query
    });
};

const storeUser = (req, res) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'POST Api Controller!!!',
        nombre,
        edad
    });
};
const deleteUser = (req, res) => {
    res.json({
        msg: 'DELETE Api Controller!!!'
    });
};
const updateUser = (req, res) => {

    const id = req.params.userId;

    res.json({
        msg: 'PUT Api Controller!!!',
        id
    });
};
const patchUser = (req, res) => {
    res.json({
        msg: 'PATCH Api Controller!!!'
    });
};


module.exports = { 
    getUser,
    storeUser,
    deleteUser,
    updateUser,
    patchUser
 };