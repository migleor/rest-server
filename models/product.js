const {Schema, model } = require('mongoose');

const ProductSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0,
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref:'Categorie',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean, 
        default:true
    },
    img: {
        type: String,
    },    
});

ProductSchema.methods.toJSON = function(){
    const { __v, estado, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}


module.exports = model('Product', ProductSchema)