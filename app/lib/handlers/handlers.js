const R = require('ramda');
const Boom = require('boom');
const es = require('elasticsearch');
const esClient = new es.Client({ host: 'http://localhost:9200' });

module.exports = {
  listHandler: (request, reply) => // eslint-disable-line no-unused-vars
    esClient.search({ index: 'tasks-out', type: 'task', size: 100 })
      .then(result => result.hits.hits)
      .then(R.map(R.prop('_source')))
      .then(reply)
      .catch(err => {
        const statusCode = R.propOr(500, 'statusCode', err);
        request.log(['error'], err.message);
        return reply(Boom.wrap(err, statusCode));
      }),
  getHandler: (request, reply) => // eslint-disable-line no-unused-vars
    esClient.get({ index: 'tasks-out', type: 'task', id: request.params.id })
      .then(R.prop('_source'))
      .then(reply)
      .catch(err => {
        const statusCode = R.propOr(500, 'statusCode', err);
        request.log(['error'], err.message);
        return reply(Boom.wrap(err, statusCode));
      }),
  postHandler: (request, reply) => { // eslint-disable-line no-unused-vars
    return esClient.index({ index: 'tasks-in', type: 'task', body: request.payload })
      .then(response => esClient.get({ index: 'tasks-out', type: 'task', id: response._id }))
      .then(R.prop('_source'))
      .then(reply)
      .catch(err => {
        const statusCode = R.propOr(500, 'statusCode', err);
        request.log(['error'], err.message);
        return reply(Boom.wrap(err, statusCode));
      });
  },
  putHandler: (request, reply) => {
    return esClient.update({ index: 'tasks-in', type: 'task', id: request.params.id, body: { doc: request.payload } })
      .then(response => esClient.get({ index: 'tasks-out', type: 'task', id: response._id }))
      .then(R.prop('_source'))
      .then(reply)
      .catch(err => {
        const statusCode = R.propOr(500, 'statusCode', err);
        request.log(['error'], err.message);
        return reply(Boom.wrap(err, statusCode));
      });
  },
  deleteHandler: (request, reply) => {
    return esClient.delete({ index: 'tasks-in', type: 'task', id: request.params.id })
      .then(reply)
      .catch(err => {
        const statusCode = R.propOr(500, 'statusCode', err);
        request.log(['error'], err.message);
        return reply(Boom.wrap(err, statusCode));
      });
  }
};
