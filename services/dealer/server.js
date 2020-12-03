const http = require('http');
const app = require('./app');

const port = 3002;

const server = http.createServer(app);

server.listen(port,()=>console.log('Dealer Service running on port '+port));