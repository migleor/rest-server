const {Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'Correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password es obligatorio'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    isgoogle: {
        type: Boolean,
        default: false        
    }
});

UserSchema.methods.toJSON = function(){
    console.log(this.object);
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model( 'User', UserSchema);