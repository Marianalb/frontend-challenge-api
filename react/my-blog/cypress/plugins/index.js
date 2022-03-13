/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--window-size=1440,900');
    }
    return launchOptions;
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const options = {
    outputRoot: `${config.projectRoot}/cypress/logs/`,
    outputTarget: {
      'out.txt': 'txt',
      'out.json': 'json',
    },
  };
}
