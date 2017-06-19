const hapi = require('hapi');
const pkg = require('./package');

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

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw(err);
    }
    console.log('Server running at: ', server.info.uri);
  });
}
