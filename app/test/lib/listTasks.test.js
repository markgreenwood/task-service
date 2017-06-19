const assert = require('assert');
const sinon = require('sinon');

const listTasks = require('../../lib/listTasks');

describe('listTasks handler', () => {
  let esStorage;
  let testResponse = [
    { name: 'Task 1' },
    { name: 'Task 2' }
  ];

  beforeEach(() => {
    esStorage = {
      list: sinon.stub().returns(Promise.resolve(testResponse))
    };
  });

  it('calls esStorage.list', () => {
    listTasks()
      .then(() => {
        assert(esStorage.list.calledOnce);
      });
  });
});