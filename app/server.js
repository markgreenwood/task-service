const hapi = require('hapi');
const pkg = require('./package');
const R = require('ramda');
const handleWithCatch = require('./utils/handleWithCatch');
const catchError = require('./utils/catchError');
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

const safeHandlers = R.map(handleWithCatch(catchError), handlers);

server.route({
  method: 'GET',
  path: '/task',
  handler: safeHandlers.listHandler
});

server.route({
  method: 'GET',
  path: '/task/{id}',
  handler: safeHandlers.getHandler
});

server.route({
  method: 'POST',
  path: '/task',
  handler: safeHandlers.postHandler
});

server.route({
  method: 'PUT',
  path: '/task/{id}',
  handler: safeHandlers.putHandler
});

server.route({
  method: 'DELETE',
  path: '/task/{id}',
  handler: safeHandlers.deleteHandler
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
