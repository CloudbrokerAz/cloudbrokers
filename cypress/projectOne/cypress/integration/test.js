/// <reference types="cypress" />

it('Test Project One', () => {
  cy.visit('http://13.211.79.5:80/');
  
  //find iphone
  cy.get(':nth-child(6) > a').click();
  cy.get(':nth-child(2) > .product-thumb > :nth-child(2) > .caption > h4 > a').click();
  
  //add to cart
  cy.get('#button-cart').click();
  cy.get('.btn-inverse')
  cy.get('[href="http://13.211.79.5/index.php?route=checkout/checkout"]').click();

  //checkout
  cy.get(':nth-child(4) > label > input').click();
  cy.wait(2000);
  cy.get('#button-account').click();
  cy.wait(2000);
  cy.get('#input-payment-firstname').type('test');
  cy.wait(1000);
  cy.get('#input-payment-lastname').type('user');
  cy.wait(1000);
  cy.get('#input-payment-email').type('user@gmail.com');
  cy.wait(1000);
  cy.get('#input-payment-telephone').type('555-5555');
  cy.wait(1000);
  cy.get('#input-payment-address-1').type('123 fake street');
  cy.wait(1000);
  cy.get('#input-payment-city').type('springfield');
  cy.wait(1000);
  cy.get('#input-payment-postcode').type('80085');
  cy.wait(1000);
  cy.get('#input-payment-zone').select('Angus');
  cy.wait(2000);
  cy.get('#button-guest').click();
  cy.wait(2000);
  cy.get('#button-shipping-method').click();
  cy.wait(2000);
  cy.get('.pull-right > [type="checkbox"]').click();
  cy.wait(2000);
  cy.get('#button-payment-method').click();
  cy.wait(5000);
  cy.get('#button-confirm').click();
  cy.wait(2000);
  cy.get('.pull-right > .btn').click();

  

  


})
