const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersEndpoint = '/api/users';
        //Middlewares
        this.middlewares();
        //Rutas de la app
        this.routes();
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

        this.app.use(this.usersEndpoint, require('../routes/user.routes'));

    }

    listen(){
        this.app.listen(this.port, () => {
          console.log(`Example app listening on port ${this.port}`)
        });     
    }
}

module.exports = Server;