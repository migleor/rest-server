const {Schema, model } = require('mongoose');

const CategorieSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorieSchema.methods.toJSON = function(){
    const { __v, estado, _id, ...categorie } = this.toObject();
    categorie.uid = _id;
    return categorie;
}


module.exports = model('Categorie', CategorieSchema)