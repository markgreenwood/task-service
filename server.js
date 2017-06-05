const hapi = require('hapi');

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

server.start((err) => {
  if (err) {
    throw(err);
  }
  console.log('Server running at: ', server.info.uri);
});