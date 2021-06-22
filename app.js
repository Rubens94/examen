require('dotenv').config();
 Server = require('./models/server');

const server = new Server();

server.listen();