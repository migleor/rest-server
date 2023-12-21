const path = require('path');
const { v4: uuidv4 } = require('uuid')


const uploadFile = ( files, validExtensions = ['png' ,'jpg','jpeg','gif'], folder='' ) => {

    return new Promise((resolve, reject)=>{
        const { archivo } = files;
        const parts = archivo.name.split('.');
        const ext = parts[parts.length - 1];

    
        if(!validExtensions.includes(ext)){
            return reject(`La extensión ${ext} del archivo no es permitida ${validExtensions}`);
        }
        


        const tempName = uuidv4() + '.' + ext;
        uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
            resolve(tempName );
        });
    })
}

module.exports = {
    uploadFile
}