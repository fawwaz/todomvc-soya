/**
 * CONFIGURATION FILE.
 *
 * Should be able to read environment variables in this file to determine
 * configuration variables. Although this file is only run in server side,
 * the client-side config you create will be sent to browsers - be very
 * careful of what you put there.
 *
 * @SERVER
 * @WEBPACK
 */

var env = process.env.NODE_ENV || 'development';
var dirname = process.env.SOYA_PROJECT_DIR;
var domain = 'localhosts:8004';
var apiHost = 'localhost:8004';

/**
 * Framework configuration..
 */
var frameworkConfig = {
  absoluteProjectDir: dirname,
  assetHostPath: domain + '/assets/',
  assetProtocol: 'http',
  clientReplace: {},
  clientResolve: [],
  componentBrowser: true,
  debug: true,
  hotReload: true,
  minifyJs: false,
  port: 8004,
  defaultImportBase: false
};

var appConfig = {
  apiHost: apiHost,
  apiProtocol: 'http',
  enableDevTools: true,
  url: {
    internalApi: 'http://' + apiHost
  }
};

var serverConfig = {};

/**
 * Please note that clientConfig is exposed to browser, so you shouldn't put
 * sensitive configuration in there.
 */

var clientConfig = {};

var defaultConfig = {
  frameworkConfig: frameworkConfig,
  serverConfig: Object.assign({}, appConfig, serverConfig),
  clientConfig: Object.assign({}, appConfig, clientConfig)
};

var config = require('./config/' + env + '.js');

module.exports = {
  frameworkConfig: Object.assign({}, defaultConfig.frameworkConfig, config.frameworkConfig),
  serverConfig: Object.assign({}, defaultConfig.serverConfig, config.serverConfig),
  clientConfig: Object.assign({}, defaultConfig.clientConfig, config.clientConfig)
};
