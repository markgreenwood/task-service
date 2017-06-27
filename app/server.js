const hapi = require('hapi');
const pkg = require('./package');
const handlers = require('./lib/handlers/handlers');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 9000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('Hello, world!')
});

server.route({
  method: 'GET',
  path: '/healthcheck',
  handler: (request, reply) => reply({ status: 'OK', version: pkg.version })
});

server.route({
  method: 'GET',
  path: '/task',
  handler: handlers.listHandler
});

server.route({
  method: 'GET',
  path: '/task/{id}',
  handler: handlers.getHandler
});

server.route({
  method: 'POST',
  path: '/task',
  handler: handlers.postHandler
});

server.route({
  method: 'PUT',
  path: '/task/{id}',
  handler: handlers.putHandler
});

server.route({
  method: 'DELETE',
  path: '/task/{id}',
  handler: handlers.deleteHandler
});

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw(err);
    }
    console.log('Server running at: ', server.info.uri);
  });
}

module.exports = server;
