import { eValidationErrorMessage } from 'app/widgets/directives/show-validation-error/validations';

const matButtonToggleGroupErrorTestID =
  "[data-testid='mat-button-toggle-group-error']";
const matButtonToggleSaleTestID = "[data-testid='mat-button-toggle-sale']";
const matButtonToggleRentTestID = "[data-testid='mat-button-toggle-rent']";
const matSelectPropertyTypeTestID = "[data-testid='mat-select-property-type']";
const matSelectDistrictTestID = "[data-testid='mat-select-district']";
const matInputLocationTestID = "[data-testid='mat-input-location']";
const matInputLocationAutoCompleteTestID =
  "[data-testid='mat-input-location-auto-complete']";

const matButtonSubmitTestID = "[data-testid='mat-button-submit']";

const getMatButtonToggleRent = () => cy.get(matButtonToggleRentTestID);
const getMatButtonSubmit = () => cy.get(matButtonSubmitTestID);
const getMatInputLocationAutoComplete = () =>
  cy.get(matInputLocationAutoCompleteTestID);
const getMatInputLocation = () => cy.get(matInputLocationTestID);
const getMatSelectDistrict = () => cy.get(matSelectDistrictTestID);
const getMatSelectPropertyType = () => cy.get(matSelectPropertyTypeTestID);
const getMatButtonToggleSale = () => cy.get(matButtonToggleSaleTestID);

const getMatButtonToggleGroupError = () =>
  cy.get(matButtonToggleGroupErrorTestID);

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should use search to find house sale in New York City', () => {
    getMatButtonToggleGroupError().should(
      'contain.html',
      eValidationErrorMessage.REQUIRED
    );

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/**',
    }).as('api');

    getMatButtonToggleSale().click();

    cy.wait('@api').its('response.statusCode').should('eq', 304);

    getMatSelectPropertyType()
      .click()
      .then(() => {
        cy.get('mat-option')
          .should('have.length', 5)
          .click({ force: true, multiple: true });
        cy.wait('@api').its('response.statusCode').should('eq', 304);
      });

    getMatSelectDistrict()
      .click()
      .then(() => {
        cy.get('mat-option')
          .should('have.length', 3)
          .click({ force: true, multiple: true });
        cy.wait('@api').its('response.statusCode').should('eq', 304);
      });

    getMatInputLocation().click();
    getMatInputLocationAutoComplete().then(() => {
      cy.get('mat-option')
        .should('have.length', 1)
        .should('contain', 'New York City')
        .click();
    });

    getMatButtonSubmit().click({ force: true, multiple: true });
    cy.wait('@api').its('response.statusCode').should('eq', 304);
  });

  it('should use search to find house rent in Newark ', () => {
    getMatButtonToggleGroupError().should(
      'contain.html',
      eValidationErrorMessage.REQUIRED
    );

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/**',
    }).as('api');

    getMatButtonToggleRent().click();

    cy.wait('@api').its('response.statusCode').should('eq', 304);

    getMatSelectPropertyType()
      .click()
      .then(() => {
        cy.get('mat-option')
          .should('have.length', 6)
          .click({ force: true, multiple: true });
        cy.wait('@api').its('response.statusCode').should('eq', 304);
      });

    getMatSelectDistrict()
      .click()
      .then(() => {
        cy.get('mat-option')
          .should('have.length', 2)
          .click({ force: true, multiple: true });
        cy.wait('@api').its('response.statusCode').should('eq', 304);
      });

    getMatInputLocation().click();
    getMatInputLocationAutoComplete().then(() => {
      cy.get('mat-option')
        .should('have.length', 1)
        .should('contain', 'Newark')
        .click();
    });

    getMatButtonSubmit().click({ force: true, multiple: true });
    cy.wait('@api').its('response.statusCode').should('eq', 304);
  });
});
