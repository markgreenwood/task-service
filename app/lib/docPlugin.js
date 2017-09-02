const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

module.exports = (packageJson) => {
  let info = {};

  if (packageJson) {
    info = {
      title: packageJson.title,
      version: packageJson.version
    };
  }

  return [
    Inert,
    Vision,
    {
      register: HapiSwagger,
      options: {
        info,
        documentationPath: '/docs'
      }
    }
  ];
};