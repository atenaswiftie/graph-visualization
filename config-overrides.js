const WorkerPlugin = require('worker-plugin');

module.exports = function override(config, env) {
  // Use the WorkerPlugin to enable worker-loader
  config.plugins.push(new WorkerPlugin());

  // Additional custom webpack configurations can go here
  return config;
};