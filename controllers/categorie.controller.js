const { response } = require('express');
const { Categorie } = require('../models')

//getCategories- paginado - total - populate(nombre de usuario) - ojo el estado
const getCategories = async(req, res= response) => {
    
    const { limit = 5, page = 0 } = req.query;

    const [totalCategories, categories] = await Promise.all([
        Categorie.countDocuments({estado: true}),
        Categorie.find({estado: true})
        .skip(Number(page))
        .limit(Number(limit))
        .populate({
            path: 'user',
            options: {
                select: "nombre"
            }
        })
    ]);

    res.json({
        totalCategories,
        page,
        categories
    });    

}
//getCategory - populate objeto categoria
const getCategory = async (req, res = response) => {

    const id = req.params.id
    const category = await Categorie.findById(id)
    .populate({
        path: 'user',
        options: {
            select: "nombre"
        }
    })
    
    if(!category){
        return res.status(401).json({
            msg: `La categoria con id ${id} no existe!!`
        })
    }

    return res.json({
        category
    })

}

const createCategorie = async (req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categorieDB = await Categorie.findOne({name})

    if(categorieDB){
        return res.status(400).json({
            msg: `La categoria ${ categorieDB.name } ya existe`
        })
    }
    //generar data a guardar
    const data = {
        name,
        user: req.uid
    }

    const categorie = new Categorie(data)
    
    //add db 
    await categorie.save();

    res.status(201).json({
        msg:'Categoria Creada exitosamente',
        categorie 
    })
}

//updateCategorie
const updateCategorie = async (req, res = response) =>{
    const id = req.params.id
    const name = req.body.name.toUpperCase()

    const categorie = await Categorie.findOne({ name })

    if(categorie){
        res.status(401).json({
            'msg': `La categoria ${name} ya existe con el id ${categorie._id}`
        })
    }

    data = {
        name,
        user: req.uid
    }

    const categorieDb = await Categorie.findByIdAndUpdate(id, data)
    .populate({
        path: 'user',
        options: {
            select: "nombre"
        }
    });

    res.json({
        msg: 'Categoria Actualizada Exitosamente',
        categorieDb
    });    


}
//deleteCategorie (mod estado a false)

const deleteCategorie = async(req, res) => {
    const id = req.params.id;

    const categorieDb = await Categorie.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: 'Categoria Borrado exitosamente',
        categorieDb,
    });
}


module.exports = {
    createCategorie,
    getCategories,
    getCategory,
    updateCategorie,
    deleteCategorie
}