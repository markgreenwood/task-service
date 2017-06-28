module.exports = handlers => [
  {
    method: 'GET',
    path: '/task',
    handler: handlers.listHandler
  },
  {
    method: 'GET',
    path: '/task/{id}',
    handler: handlers.getHandler
  },
  {
    method: 'POST',
    path: '/task',
    handler: handlers.postHandler
  },
  {
    method: 'PUT',
    path: '/task/{id}',
    handler: handlers.putHandler
  },
  {
    method: 'DELETE',
    path: '/task/{id}',
    handler: handlers.deleteHandler
  }
];
