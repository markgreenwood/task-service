const hapi = require('hapi');
const pkg = require('./package');
const R = require('ramda');
const handleWithCatch = require('./lib/utils/handleWithCatch');
const catchError = require('./lib/utils/catchError');
const handlers = require('./lib/handlers');
const routes = require('./lib/routes');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 9000
});

server.route({
  method: 'GET',
  path: '/healthcheck',
  handler: (request, reply) => reply({ status: 'OK', version: pkg.version })
});

const safeHandlers = R.map(handleWithCatch(catchError), handlers);

server.route(routes(safeHandlers));

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw(err);
    }
    console.log('Server running at: ', server.info.uri);
  });
}

module.exports = server;
