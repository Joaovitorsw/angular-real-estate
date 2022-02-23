const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const path = 'http://localhost:5875'
server.listen(5875, () => {
  console.log('JSON Server is running ' + path)
});