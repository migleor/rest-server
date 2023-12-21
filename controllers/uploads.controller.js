const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");


const uploadFiles = async (req, res = response) => {

	try {
		//const fileupload = await uploadFile(req.files, ['txt','md'], 'textos')
		const fileupload = await uploadFile(req.files, undefined, 'images')
		res.json({
			file:fileupload
		});		
	} catch (error) {
		res.status(400).json(
			{ msg: error }
		)
	}
}

const updateImagesCollections = async (req, res = response) => {

	const {collection, id} = req.params;

	let model;


	switch(collection){
		case 'users':
			model = await User.findById(id);

			if(!model){
				return res.status(400).json({msg: 'Usuario Invalido'})
			}

		break;

		case 'products':
			model = await Product.findById(id);

			if(!model){
				return res.status(400).json({msg: 'Producto Invalido'})
			}

		break;		
		default:
			return res.status(500).json({
				msg: 'Coleccion no implementada'
			})
		break;
	}

	
	try {
		//limpiar imagenes previas
	
		if(model.img){
			//validar si la imagen existe en elservido
			/*pathImg = path.join(__dirname, '../uploads', collection, model.img);
			if(fs.existsSync(pathImg)){
				fs.unlinkSync(pathImg);
			}*/
			const nameArr = model.img.split('/');
			const nameImg = nameArr[nameArr.length -1];
			const [ public_id ] = nameImg.split('.');
			
			cloudinary.uploader.destroy(public_id)


		}
		const { tempFilePath } = req.files.archivo;
		const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
		/*const fileUploaded = await uploadFile(req.files, undefined, collection);*/
		model.img = secure_url;
		await model.save();

		return res.json({
			msg: `El id ${id} de la colección ${collection} ha sido actualizado exitosamente`,
			model
		})

	} catch (error) {
		console.log(error);
		return res.status(500).json({error})
	}
}

const regresarImagen = async (req, res = response) => {
	const {collection, id} = req.params;

	let model;

	switch(collection){
		case 'users':
			model = await User.findById(id);

			if(!model){
				return res.status(400).json({msg: 'Usuario Invalido'})
			}

		break;

		case 'products':
			model = await Product.findById(id);

			if(!model){
				return res.status(400).json({msg: 'Producto Invalido'})
			}

		break;		
		default:
			return res.status(500).json({
				msg: 'Coleccion no implementada'
			})
		break;
	}	
	pathNoImg = path.join(__dirname, '../assets/no_image.png'); 
	if(model.img){
		//validar si la imagen existe en elservido
		pathImg = path.join(__dirname, '../uploads', collection, model.img);		
		if(fs.existsSync(pathImg)){
			return res.sendFile(pathImg);
		}else{
			return res.sendFile(pathNoImg);
		}
	}else{
		return res.sendFile(pathNoImg);
	}

}

module.exports = {
	uploadFiles,
	updateImagesCollections,
	regresarImagen
}