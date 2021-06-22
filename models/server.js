const express          = require('express');
const cors             = require('cors');
const { createServer } = require('http');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer( this.app );
        
        this.paths = {
            inicio:      '/',
            generateKey: '/generateKey',
            encrypt:     '/encrypt',
            decrypt:     '/decrypt'    
        }

        this.middlewares();
        
        this.routes();

    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.paths.inicio,      require('../routes/routes') );
        this.app.use( this.paths.generateKey, require('../routes/routes') );
        this.app.use( this.paths.encrypt,     require('../routes/routes') );
        this.app.use( this.paths.decrypt,     require('../routes/routes'));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });
    }
}

module.exports = Server;