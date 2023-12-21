const { response } = require("express");

const validateUploads = (req, res = response, next) => {


	if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
		return res.status(400).json({ msg: 'No ha seleccionado archivos para subir' });

	}
   

    next();
}


module.exports = {

    validateUploads

}