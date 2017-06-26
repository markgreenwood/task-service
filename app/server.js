const hapi = require('hapi');
const pkg = require('./package');
const es = require('elasticsearch');
const R = require('ramda');
// const eb = require('elastic-builder');

const server = new hapi.Server();
const esClient = new es.Client({ host: 'http://localhost:9200' });

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
  handler: (request, reply) => // eslint-disable-line no-unused-vars
    esClient.search({ index: 'tasks-out', type: 'task', size: 100 })
      .then(result => result.hits.hits)
      .then(R.map(R.prop('_source')))
      .then(reply)
});

server.route({
  method: 'GET',
  path: '/task/{id}',
  handler: (request, reply) => // eslint-disable-line no-unused-vars
    esClient.get({ index: 'tasks-out', type: 'task', id: request.params.id })
      .then(R.prop('_source'))
      .then(reply)
});

server.route({
  method: 'POST',
  path: '/task',
  handler: (request, reply) => { // eslint-disable-line no-unused-vars
    return esClient.index({index: 'tasks-in', type: 'task', body: request.payload})
      .then((response) => {
        return esClient.get({index: 'tasks-out', type: 'task', id: response._id})
          .then((response) => {
            console.log(response);
            return R.prop('_source', response);
          });
      });
  }
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
