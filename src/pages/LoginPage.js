/* eslint-disable no-unused-expressions */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

const EMAIL_INPUT = '[name="email"]';
const PASSWORD_INPUT = '[name="password"]';
const LOGIN_BUTTON = '.btn';
const GET_STARTED = '.btn.btn-primary.next-step-button';
const FIRST_NAME = '[name="firstName"]';
const LAST_NAME = '[name="lastName"]';
const CREATE_ACCOUNT = 'Create Account';
const PHONE_INPUT = '[name="mobile"]';

export default class LoginPage {

  static selfOnboarding(firstname, lastname, email, password, phone) {
    cy.visit('/');
    cy.contains(CREATE_ACCOUNT).click();
    cy.url().should('include', '/signup');
    cy.get(FIRST_NAME)
      .type(firstname)
      .should('have.value', firstname);
    cy.get(LAST_NAME)
      .type(lastname)
      .should('have.value', lastname);
    cy.get(EMAIL_INPUT)
      .type(email)
      .should('have.value', email);
    cy.get(PHONE_INPUT)
      .type(phone)
      .should('have.value', phone);
    cy.get(PASSWORD_INPUT)
      .type(password)
      .should('have.value', password);
    cy.get(GET_STARTED).click();
    cy.url().should('include', '/success');
    cy.wait(5000);
  }

  static selfOnboardingReferral(firstname, lastname, email, password, phone) {
    cy.visit('/account/signin/?from=essencefoodservice');
    cy.contains(CREATE_ACCOUNT).click();
    cy.url().should('include', '/signup');
    cy.get('.third-party-logo').should((el) => {
      expect(el).to.be.visible;
    });
    cy.get(FIRST_NAME)
      .type(firstname)
      .should('have.value', firstname);
    cy.get(LAST_NAME)
      .type(lastname)
      .should('have.value', lastname);
    cy.get(EMAIL_INPUT)
      .type(email)
      .should('have.value', email);
    cy.get(PHONE_INPUT)
      .type(phone)
      .should('have.value', phone);
    cy.get(PASSWORD_INPUT)
      .type(password)
      .should('have.value', password);
    cy.get(GET_STARTED).click();
    cy.url().should('include', '/success');
    cy.wait(5000);
  }
}
