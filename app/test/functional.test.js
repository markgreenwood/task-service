const assert = require('assert');
const es = require('elasticsearch'); // eslint-disable-line no-unused-vars
const R = require('ramda');
const server = require('../server');
const pkg = require('../package');

describe ('task-service', () => {

  const expected = [
    { id: '1', task: 'Task 1' },
    { id: '2', task: 'Task 2' },
    { id: '3', task: 'Task 3' },
    { id: '4', task: 'Task 4' },
    { id: '5', task: 'Task 5' },
    { id: '6', task: 'Task 6' },
    { id: '7', task: 'Task 7' },
    { id: '8', task: 'Task 8' },
    { id: '9', task: 'Task 9' },
    { id: '10', task: 'Task 10' }
  ];

  const indexSettings = { // eslint-disable-line no-unused-vars
    settings: {
      index: {
        number_of_shards: 1,
        number_of_replicas: 1
      }
    }
  };

  const bulkRequestBuilder = R.compose(R.flatten, R.map((item) => [ { index: { _index: 'testtasks', _type: 'task', _id: item.id } }, R.omit('id', item) ]));
  const bulkIndexArray = bulkRequestBuilder(expected);

  const esClient = new es.Client({
    host: 'localhost:9200'
  });

  before(done =>
    esClient.indices.delete({ index: 'testtasks' }, () =>
      esClient.indices.create(
        {
          index: 'testtasks',
          body: R.merge(indexSettings, { aliases: { 'tasks-in': {}, 'tasks-out': {} } })
        },
        () => esClient.bulk({ body: bulkIndexArray }, () =>
          esClient.indices.refresh({}, done)
        )
      )
    )
  );

  it ('queries the database', () => {
    esClient.search({ index: 'testtasks', type: 'task' })
      .then(resp => assert.equal(resp.hits.total, 10));
  });

  it ('runs healthcheck', () => {
    const request = {
      method: 'GET',
      url: '/healthcheck'
    };

    return server.inject(request)
      .then((response) => {
        assert.equal(response.result.status, 'OK');
        assert.equal(response.result.version, pkg.version);
      });
  });

  it ('GET /task returns a list of tasks', () => {
    const request = {
      method: 'GET',
      url: '/task'
    };

    return server.inject(request)
      .then(response => assert.equal(response.result.length, expected.length));
  });

  it ('GET /task/{id} returns task with ID {id}', () => {
    const request = {
      method: 'GET',
      url: '/task/1'
    };

    return server.inject(request)
      .then(response => assert.equal(R.prop('task', response.result), 'Task 1'));
  });

  it ('GET /task/{id} returns 404 Not Found if id is nonexistent', () => {
    const request = {
      method: 'GET',
      url: '/task/42'
    };

    return server.inject(request)
      .then(response => assert.equal(R.prop('statusCode', response), 404));
  });

  it ('POST /task creates a new task and returns a copy after POSTing', () => {
    const request = {
      method: 'POST',
      url: '/task',
      payload: {
        task: 'Task 13'
      }
    };

    return server.inject(request)
      .then(response => assert.equal(R.prop('task', response.result), 'Task 13'));
  });

  it ('PUT /task/{id} modifies id and returns a copy of the full object after the PUT', () => {
    const request = {
      method: 'PUT',
      url: '/task/1',
      payload: {
        task: 'Task 1 Modified'
      }
    };

    return server.inject(request)
      .then(response => assert.equal(R.prop('task', response.result), 'Task 1 Modified'));
  });

  it ('DELETE /task/{id} removes id from the store and returns a copy of the removed object', () => {
    const request = {
      method: 'DELETE',
      url: '/task/1'
    };

    return server.inject(request)
      .then(() =>
        server.inject({method: 'GET', url: '/task/1'})
          .then(response => assert.equal(R.prop('statusCode', response), 404))
      );
  });
});
