const R = require('ramda');
// const Boom = require('boom');
const es = require('elasticsearch');
const esClient = new es.Client({ host: 'http://localhost:9200' });

module.exports = {
  listHandler: (request) => // eslint-disable-line no-unused-vars
    esClient.search({ index: 'tasks-out', type: 'task', size: 100 })
      .then(result => result.hits.hits)
      .then(R.map(R.prop('_source'))),
  getHandler: (request) => // eslint-disable-line no-unused-vars
    esClient.get({ index: 'tasks-out', type: 'task', id: request.params.id })
      .then(R.prop('_source')),
  postHandler: (request) => { // eslint-disable-line no-unused-vars
    return esClient.index({ index: 'tasks-in', type: 'task', body: request.payload })
      .then(response => esClient.get({ index: 'tasks-out', type: 'task', id: response._id }))
      .then(R.prop('_source'));
  },
  putHandler: (request) => {
    return esClient.update({ index: 'tasks-in', type: 'task', id: request.params.id, body: { doc: request.payload } })
      .then(response => esClient.get({ index: 'tasks-out', type: 'task', id: response._id }))
      .then(R.prop('_source'));
  },
  deleteHandler: (request) => {
    return esClient.delete({ index: 'tasks-in', type: 'task', id: request.params.id });
  }
};
