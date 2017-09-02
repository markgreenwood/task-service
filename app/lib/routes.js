const Joi = require('joi');

module.exports = handlers => [
  {
    method: 'GET',
    path: '/task',
    config: {
      tags: ['api'],
      handler: handlers.listHandler
    }
  },
  {
    method: 'GET',
    path: '/task/{id}',
    config: {
      tags: ['api'],
      handler: handlers.getHandler,
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/task',
    config: {
      tags: ['api'],
      handler: handlers.postHandler,
      validate: {
        payload: Joi.object().required()
      }
    }
  },
  {
    method: 'PUT',
    path: '/task/{id}',
    config: {
      tags: ['api'],
      handler: handlers.putHandler,
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/task/{id}',
    config: {
      tags: ['api'],
      handler: handlers.deleteHandler,
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  }
];
