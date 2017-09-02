const Good = require('good');

module.exports = () => {
  const options = {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*', request: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  };

  return {
    register: Good,
    options
  };
};