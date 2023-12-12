const { response } = require('express');
const { Product } = require('../models')

//getCategories- paginado - total - populate(nombre de usuario) - ojo el estado
const getProducts = async(req, res= response) => {
    
    const { limit = 5, page = 0 } = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments({estado: true}),
        Product.find({estado: true})
        .skip(Number(page))
        .limit(Number(limit))
        .populate('categorie', 'name')
    ]);

    res.json({
        total,
        page,
        products
    });    
}

const getProduct = async(req, res = response) => {
    const id = req.params.id
    const product = await Product.findById(id)
    .populate({
        path: 'categorie',
        options: {
            select: "name"
        }
    })
    
    if(!product){
        return res.status(401).json({
            msg: `El producto con id ${id} no existe!!`
        })
    }

    return res.json({
        product
    })
}

const createProduct = async (req, res = response ) => {

    const name = req.body.name.toUpperCase();
    const categorie = req.body.categoria;
    const descripcion = req.body.descripcion;

    const productDB = await Product.findOne({name, categorie})

    if(productDB){
        return res.status(400).json({
            msg: `El producto ${ productDB.name } ya existe para la categoria enviada`
        })
    }
    //generar data a guardar
    const data = {
        name,
        categorie,
        descripcion,
        user: req.uid
    }

    const product = new Product(data)
    
    //add db 
    await product.save();

    res.status(201).json({
        msg:'Producto Creado exitosamente',
        product 
    })
}

const updateProduct = async(req, res = response) => {
    const id = req.params.id
    const {name, categoria, descripcion} = req.body;
    nombre = name.toUpperCase();

    const product = await Product.findOne({ name:nombre, categorie:categoria })

    if(product){
        res.status(401).json({
            'msg': `El producto ${name} ya existe en la categoria enviada `
        })
    }

    data = {
        name:nombre,
        categorie:categoria,
        descripcion,
        user: req.uid
    }

    const ProductDb = await Product.findByIdAndUpdate(id, data, {new: true})
    .populate({
        path: 'categorie',
        options: {
            select: "name"
        }
    });

    res.json({
        msg: 'Categoria Actualizada Exitosamente',
        ProductDb,
    });
}

const deleteProduct = async(req, res = response) => {
    const id = req.params.id;

    const productDb = await Product.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: 'Producto Borrado exitosamente',
        productDb,
    });
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}