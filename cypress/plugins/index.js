/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const debug = require("debug");
const path = require("path");
const gmail_tester = require("../../node_modules/gmail-tester");
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // ...

  on("task", {
    "gmail:get-messages": async args => {
      const messages = await gmail_tester.get_messages(
        path.resolve('/Users/rakesh/Desktop/gmailTesting1/cypress/plugins/directory', 'credentials.json'),
        path.resolve('/Users/rakesh/Desktop/gmailTesting1/cypress/plugins/directory', 'token.json'),
        args.options
      );
      return messages;
      },
      "gmail:check-inbox": async args => {
        const messages = await gmail_tester.check_inbox(
          path.resolve('/Users/rakesh/Desktop/gmailTesting1/cypress/plugins/directory', 'credentials.json'),
          path.resolve('/Users/rakesh/Desktop/gmailTesting1/cypress/plugins/directory', 'token.json'),
        args.options
        );
        return messages;
      }
  });
};
