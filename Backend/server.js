const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});