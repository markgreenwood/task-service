const R = require('ramda');
const Boom = require('boom');

module.exports = (request, reply, error) => {
  const status = R.propOr(500, 'statusCode', error);
  request.log(['error'], error.message);
  return reply(Boom.wrap(error, status));
};
