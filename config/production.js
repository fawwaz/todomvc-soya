var domain = process.env.NOW_URL || 'localhosts:8004';
var apiHost = process.env.NOW_URL || 'localhost:8004';

/**
 * Framework configuration
 */
var frameworkConfig = {
  assetHostPath: domain + '/assets/',
  assetProtocol: 'http',
  componentBrowser: true,
  debug: true,
  hotReload: true,
  minifyJs: false,
  port: 8004,
  NODE_ENV: '"development"'
};

var appConfig = {
  apiHost: apiHost,
  apiProtocol: 'https',
  enableDevTools: true,
  url: {
    internalApi: 'https://' + apiHost
  }
};

var serverConfig = {
  isProduction: false
};

/**
 * Please note that clientConfig isexposed to browser, so you shouldn't put
 * sensitive configuration in there.
 */

var clientConfig = {};

module.exports = {
  frameworkConfig: frameworkConfig,
  serverConfig: Object.assign({}, appConfig, serverConfig),
  clientConfig: Object.assign({}, appConfig, clientConfig)
};
