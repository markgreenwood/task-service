const R = require('ramda');

const handleWithCatch = R.curry(
  (catchFn, handlerFn, request, reply) => handlerFn(request, reply)
    .then(reply)
    .catch(error => catchFn(request, reply, error))
);

module.exports = handleWithCatch;
