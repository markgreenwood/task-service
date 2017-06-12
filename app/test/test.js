const assert = require('assert');
const es = require('elasticsearch'); // eslint-disable-line no-unused-vars
const R = require('ramda');
// const Promise = require('bluebird');

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

  const indexSettings = {
    settings: {
      index: {
        number_of_shards: 1,
        number_of_replicas: 1
      }
    }
  };

  const bulkRequestBuilder = R.compose(R.flatten, R.map((item) => [ { index: { _index: 'testtasks', _type: 'task', _id: item.id } }, R.omit('id', item) ]));
  const bulkIndexArray = bulkRequestBuilder(expected);

  console.log(bulkIndexArray);

  const esClient = new es.Client({
    host: 'http://localhost:9200'
  });

  before((done) =>
    esClient.indices.delete({ index: 'testtasks' }, () =>
      esClient.indices.create({ index: 'testtasks', body: indexSettings }, () =>
        esClient.bulk({ body: bulkIndexArray }, done)
      )
    )
  );

  it ('runs tests', () => {
    // just a 'must pass' test to verify Travis is working
    assert(true);
  });

  // it ('GET /task returns a list of tasks', () => {
  //   listTasks()
  //     .then((result) => {
  //       assert(result.length).isEqual(expected.length);
  //     })
  // });
});
