const R = require('ramda');

module.exports = (esClient) => {
  const listHandler = request => // eslint-disable-line no-unused-vars
    esClient.search({ index: 'tasks-out', type: 'task', size: 100 })
      .then(result => result.hits.hits)
      .then(R.map(R.prop('_source')));

  const getHandler = request =>
    esClient.get({ index: 'tasks-out', type: 'task', id: request.params.id })
      .then(R.prop('_source'));

  const postHandler = request =>
    esClient.index({ index: 'tasks-in', type: 'task', body: request.payload })
      .then(response => esClient.get({ index: 'tasks-out', type: 'task', id: response._id }))
      .then(R.prop('_source'));

  const putHandler = request =>
    esClient.update({ index: 'tasks-in', type: 'task', id: request.params.id, body: { doc: request.payload } })
      .then(response => esClient.get({ index: 'tasks-out', type: 'task', id: response._id }))
      .then(R.prop('_source'));

  const deleteHandler = request =>
    esClient.delete({ index: 'tasks-in', type: 'task', id: request.params.id });

  return {
    listHandler,
    getHandler,
    postHandler,
    putHandler,
    deleteHandler
  };
};
