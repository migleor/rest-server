const { response } = require("express");
const { User, Categorie, Product } = require("../models");
const { ObjectId } = require("mongoose").Types;

const permit_colections = [
    'users',
    'categories',
    'products',
    'rols'
]

const findUsers = async(param='', isMongoID, res = response) => {

    if(isMongoID){
        const user = await User.findById(param);
        res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = RegExp( param, 'i');

    const users = await User.find({
        $or:[
            { nombre: regex },
            { email: regex }
        ],
        $and: [{status: true}]
    })
    res.json({
        results: (users) ? [users] : []
    });
}

const findCategories = async(param='', isMongoID, res = response) => {
    
    if(isMongoID){
        const categorie = await Categorie.findById(param)
        .populate('user', 'nombre');
        res.json({
            results: (categorie) ? [categorie] : []
        });
    }
    const regex = RegExp( param, 'i');

    const categories = await Categorie.find({ name: regex, estado: true })
    .populate('user', 'nombre');
    res.json({
        results: (categories) ? [categories] : []
    });
}

const findProducts = async(param='', isMongoID, res = response) => {
    
    if(isMongoID){
        const product = await Product.findById(param)
        .populate('user', 'nombre')
        .populate('categorie', 'name');
        res.json({
            results: (product) ? [product] : []
        });
    }
    const regex = RegExp( param, 'i');

    const products = await Product.find({ name: regex, estado: true })
    .populate('user', 'nombre')
    .populate('categorie', 'name');
    res.json({
        results: (products) ? [products] : []
    });
}

const buscar = (req, res = response) =>{

    const { colection, param } = req.params;
    const isMongoID = ObjectId.isValid( param );

    if(!permit_colections.includes(colection)){
        res.status(400).json({
            msg: `Las colecciones permitidas son ${permit_colections}`
        })
    }

    switch(colection){
        case 'users':
            findUsers(param, isMongoID, res);
        break;
        case 'categories':
            findCategories(param, isMongoID, res);
        break;
        case 'products':
            findProducts(param, isMongoID, res)
        break;
        default:
            res.status(500).json({
                msg: `Colección en desarrollo!!!`
            })
        break;
    }

}

module.exports = {
    buscar
}