/// <reference types="Cypress" />
import { LoginPage, AddSupplierWithAccountCreation} from '../../../src/pages/index';

const { SELF_ONBOARDING } = require('../../../src/utils/constants');
const Utils = require('../../../src/utils/utils');


describe('User creates an account and self onboards:', () => {
  it('User creates an account and looks for a confirmation email with specific subject and link in email body', () => {
    LoginPage.selfOnboarding(SELF_ONBOARDING.firstName, SELF_ONBOARDING.lastName, SELF_ONBOARDING.email, SELF_ONBOARDING.password, SELF_ONBOARDING.phone);
    cy.task('gmail:check-inbox', {
      options: {
        from: '',
        subject: 'Please Verify Your Email',
        include_body: true,
        wait_time_sec: 10,
        max_wait_time_sec: 30,
      },
    }).then((emails) => {
      assert.isNotNull(
        emails,
        'Expected to find at least one email, but none were found!',
      );
    });
  });


  it('user should be able to complete the signup process by clicking on the verification link ', () => {
    cy.task('gmail:get-messages', {
      options: {
        from: '',
        subject: 'Please Verify Your Email',
        include_body: true,
        wait_time_sec: 10,
        max_wait_time_sec: 30,
      },
    }).then((emails) => {
      assert.isAtLeast(
        emails.length,
        1,
        'Expected to find at least one email, but none were found!',
      );

      let body = emails[0].body.text;
      cy.visit(Utils.getLink(body));
      AddSupplierWithAccountCreation.restaurantName(SELF_ONBOARDING.email);
      AddSupplierWithAccountCreation.address();
      AddSupplierWithAccountCreation.createAccount();
  });
});
});