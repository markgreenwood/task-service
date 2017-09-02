const hapi = require('hapi');
const pkg = require('./package');
const R = require('ramda');
const config = require('config');
const es = require('elasticsearch');
const Promise = require('bluebird');

const esClient = new es.Client({ host: config.get('elasticsearch').host });

const handleWithCatch = require('./lib/utils/handleWithCatch');
const catchError = require('./lib/utils/catchError');
const handlers = require('./lib/handlers')(esClient);
const routes = require('./lib/routes');
const loggingPlugin = require('./lib/loggingPlugin');

const server = new hapi.Server();

server.connection(config.get('serverChassis'));

const registerLoggingPlugin = server => {
  return Promise.resolve(server.register(loggingPlugin())).return(server);
};

registerLoggingPlugin(server)
  .then(() => {
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
  });


module.exports = server;
