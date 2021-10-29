/// <reference types="cypress" />

it('Test Project One', () => {
  cy.visit('http://10.10.120.4:80/');
  
  //find iphone
  cy.get(':nth-child(6) > a').click();
  cy.get(':nth-child(2) > .product-thumb > :nth-child(2) > .caption > h4 > a').click();
  
  //add to cart
  cy.get('#button-cart').click();
  cy.get('.btn-inverse')
  cy.get('[href="http://10.10.120.4/index.php?route=checkout/checkout"]').click();

  //checkout
  cy.get(':nth-child(4) > label > input').click();
  cy.get('#button-account').click();
  cy.get('#input-payment-firstname').type('test');
  cy.get('#input-payment-lastname').type('user');
  cy.get('#input-payment-email').type('user@gmail.com');
  cy.get('#input-payment-telephone').type('555-5555');
  cy.get('#input-payment-address-1').type('123 fake street');
  cy.get('#input-payment-city').type('springfield');
  cy.get('#input-payment-postcode').type('80085');
  cy.get('#input-payment-zone').select('Angus');

  cy.get('#button-guest').click();
  cy.wait(2000);
  //cy.get('.panel-body > :nth-child(5) > .form-control').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum nisl at egestas luctus. Maecenas ex massa, venenatis non ullamcorper eget, feugiat at metus. Quisque mi magna, vehicula id aliquam efficitur, tempus et mauris. Suspendisse dapibus urna diam, eu placerat lectus pretium sit amet. Cras volutpat, felis vitae lacinia pretium, justo magna aliquam nisl, id egestas orci mi id nunc. Fusce in lacus pellentesque, consectetur dolor in, efficitur felis. Curabitur iaculis ultrices facilisis. Etiam facilisis lectus sed justo sollicitudin sollicitudin. Ut at maximus dolor, et dictum dolor. Proin dui ligula, mattis blandit lobortis condimentum, pharetra id sem. Pellentesque felis risus, euismod quis ex vel, gravida laoreet mi. Proin volutpat sem ut justo pretium, in lacinia elit euismod. Sed eu quam at sem consectetur tempor in sagittis diam. Morbi ultricies pretium dignissim. In egestas, dolor eget mattis commodo, eros ligula blandit dui, vel malesuada arcu metus quis orci. Morbi pretium massa ac iaculis consequat. Vivamus arcu eros, iaculis a tellus sit amet, volutpat dictum turpis. Aenean scelerisque ligula vel elit elementum, at tempus magna pellentesque. Etiam vestibulum tristique quam eget tempus.');
  cy.get('#button-shipping-method').click();
  cy.wait(2000);
  cy.get('.pull-right > [type="checkbox"]').click();
  cy.wait(3000);
  cy.get('#button-payment-method').click();
  cy.wait(5000);
  cy.get('#button-confirm').click();
  cy.wait(3000);
  cy.get('.pull-right > .btn').click();
})
