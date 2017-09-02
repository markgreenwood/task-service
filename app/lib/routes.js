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
      handler: handlers.getHandler
    }
  },
  {
    method: 'POST',
    path: '/task',
    config: {
      tags: ['api'],
      handler: handlers.postHandler
    }
  },
  {
    method: 'PUT',
    path: '/task/{id}',
    config: {
      tags: ['api'],
      handler: handlers.putHandler
    }
  },
  {
    method: 'DELETE',
    path: '/task/{id}',
    config: {
      tags: ['api'],
      handler: handlers.deleteHandler
    }
  }
];
