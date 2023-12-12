const express = require('express');
const cors = require('cors');
const { db_connect } = require('../database/config.db');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users',
        }

        //database conections
        this.conectDB();

        //Middlewares
        this.middlewares();
        //Rutas de la app
        this.routes();
    }

    async conectDB(){
        await db_connect();
    }
    
    middlewares() {
        //cors
        this.app.use(cors());

        //body parsing
        this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'));
        
    }
    
    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.categories, require('../routes/categorie.routes'));
        this.app.use(this.paths.products, require('../routes/product.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));

    }

    listen(){
        this.app.listen(this.port, () => {
          console.log(`Example app listening on port ${this.port}`)
        });     
    }
}

module.exports = Server;