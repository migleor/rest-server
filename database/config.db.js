const mongoose = require("mongoose");

const db_connect = async() => {

    try {

        await mongoose.connect( process.env.MONGO_DBURL, {
            serverSelectionTimeoutMS: 30000
        });
        console.log('Database conected!!!');

    } catch (error) {
        console.log('Error en la conexión a la base de datos', error);
        throw new Error('Error en la conexión a la base de datos');
    }

}

module.exports = {
    db_connect
}