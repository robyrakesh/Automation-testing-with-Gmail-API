/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */

export default class AddSupplierPage {
  static restaurantName(name) {
    cy.get('[name="businessName"]').type(name);
  }

  static address() {
    cy.get('[name="shippingAddress"]')
      .type('130 spadina Avenue')
      .type('{enter}');
    cy.get('[name="shippingStreetNumber"]').type('130');
    cy.get('[name="shippingStreetAddress"]').type('Spadina Ave');
    cy.get('[name="shippingCity"]').type('Toronto');
    cy.get('[name="shippingState"]').type('Ontario');
    cy.get('[name="shippingCountry"]').type('Canada');
    cy.get('[name="shippingZip"]').type('M5V 1X9');
  }

  static noMatchingSupplierAddress() {
    cy.get('[name="shippingAddress"]')
      .type('1475 Lower Water')
      .type('{enter}');
    cy.get('[name="shippingStreetNumber"]').type('1475');
    cy.get('[name="shippingStreetAddress"]').type('Lower Water St');
    cy.get('[name="shippingCity"]').type('Halifax');
    cy.get('[name="shippingState"]').type('Nova Scotia');
    cy.get('[name="shippingCountry"]').type('Canada');
    cy.get('[name="shippingZip"]').type('B3J 3Z2');
  }

  static createAccount() {
    cy.contains('CREATE ACCOUNT').click();
  }

  static clickAddSuppliers() {
    cy.get('.order-desk-button').click();
  }

  static proceedWithoutAddingSupplier() {
    cy.contains('NEXT').click();
    cy.get('.floating-message-button-text').click();
    cy.get('#choose-vendor-title', { timeout: 20000 }).should((el) => {
      expect(el).to.be.visible;
    });
  }

  static addSupplier(name) {
    cy.contains(name).click();
    cy.contains('NEXT').click();
  }

  static addMultipleSupplier(name1, name2, name3) {
    const suppliers = [name1, name2, name3];
    let supplierName;
    for (supplierName of suppliers) {
      cy.contains(supplierName).click();
    }
    cy.contains('NEXT').click();
  }

  static addSupplierReferral(name) {
    cy.contains('Essence Food Service ').parentsUntil('.supplier-category-box-container').get('.selectable-supplier-box').first()
      .should((el) => {
        expect(el).to.be.disabled;
      });
    cy.contains(name).click();
    cy.contains('NEXT').click();
  }

  static addBYOSSupplier(name, phoneNumber) {
    cy.get('#choose-vendor-title', { timeout: 20000 }).should((el) => {
      expect(el).to.be.visible;
    });
    cy.get('.add-supplier-box').click();
    cy.get('.modal-box-body').should((el) => {
      expect(el).to.be.visible;
    });
    cy.get('[name="supplierName"]').type(name);
    cy.get('.add-a-new-supplier').click();
    cy.get('.add-supplier-modal-button').contains('By text').click().should('have.class', 'active');
    cy.get('[name="sms"]').type(phoneNumber).should('have.value', phoneNumber);
    cy.get('.add-supplier-next-button').click();
    cy.get('.add-supplier-next-button').click();
    cy.contains('Not now').click();
    cy.contains(name).should((el) => {
      expect(el).to.be.visible;
    });
  }
}
