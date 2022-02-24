const matSelectPropertyTypeTestID = "[data-testid='mat-select-property-type']";
const matInputLocationTestID = "[data-testid='mat-input-location']";
const matSelectMinPriceTestID = "[data-testid='mat-select-min-price']";
const matSelectMaxPriceTestID = "[data-testid='mat-select-max-price']";
const matSelectBedroomsTestID = "[data-testid='mat-select-bedrooms']";
const matSelectBathroomsTestID = "[data-testid='mat-select-bathrooms']";
const matSelectMinAreaTestID = "[data-testid='mat-select-min-area']";
const matSelectMaxAreaTestID = "[data-testid='mat-select-max-area']";
const getCard = () => cy.get('re-property-card');
const getMatSelectPropertyType = () =>
  cy.get<HTMLSelectElement>(matSelectPropertyTypeTestID);
const getMatInputLocation = () =>
  cy.get<HTMLInputElement>(matInputLocationTestID);
const getMatSelectMinPrice = () =>
  cy.get<HTMLSelectElement>(matSelectMinPriceTestID);
const getMatSelectMaxPrice = () =>
  cy.get<HTMLSelectElement>(matSelectMaxPriceTestID);
const getMatSelectBedrooms = () =>
  cy.get<HTMLSelectElement>(matSelectBedroomsTestID);
const getMatSelectBathrooms = () =>
  cy.get<HTMLSelectElement>(matSelectBathroomsTestID);
const getMatSelectMinArea = () =>
  cy.get<HTMLSelectElement>(matSelectMinAreaTestID);
const getMatSelectMaxArea = () =>
  cy.get<HTMLSelectElement>(matSelectMaxAreaTestID);

const shouldBeOptions = (
  subject: () => Cypress.Chainable,
  expected: number
) => {
  subject()
    .click()
    .then(() => {
      cy.get('mat-option').should('have.length', expected);
    });
};

const matSelect = (
  select: () => Cypress.Chainable<JQuery<HTMLSelectElement>>,
  value: string
) =>
  select()
    .click()
    .then(() => {
      cy.get('mat-option').contains(value).click();
    });

const closeSelect = (
  select: () => Cypress.Chainable<JQuery<HTMLSelectElement>>
) => {
  select().focus().type('{esc}');
};

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/sale');
  });
  it('should update filter options', () => {
    matSelect(getMatSelectPropertyType, 'Triplex House');
    getCard().should('have.length', 2);

    shouldBeOptions(getMatSelectPropertyType, 6);
    closeSelect(getMatSelectPropertyType);
    shouldBeOptions(getMatInputLocation, 4);

    getMatInputLocation().type('{esc}');
    shouldBeOptions(getMatSelectMinPrice, 3);

    closeSelect(getMatSelectMinPrice);
    shouldBeOptions(getMatSelectMaxPrice, 3);

    closeSelect(getMatSelectMaxPrice);

    shouldBeOptions(getMatSelectBedrooms, 3);

    closeSelect(getMatSelectBedrooms);

    shouldBeOptions(getMatSelectBathrooms, 2);

    closeSelect(getMatSelectBathrooms);

    shouldBeOptions(getMatSelectMinArea, 3);

    closeSelect(getMatSelectMinArea);

    shouldBeOptions(getMatSelectMaxArea, 3);
  });

  it.only('should update filter options in rent', () => {
    cy.visit('/rent');

    matSelect(getMatSelectPropertyType, 'Triplex House');
    getCard().should('have.length', 1);

    shouldBeOptions(getMatSelectPropertyType, 6);
    closeSelect(getMatSelectPropertyType);
    shouldBeOptions(getMatInputLocation, 2);

    getMatInputLocation().type('{esc}');
    shouldBeOptions(getMatSelectMinPrice, 2);

    closeSelect(getMatSelectMinPrice);
    shouldBeOptions(getMatSelectMaxPrice, 2);

    closeSelect(getMatSelectMaxPrice);

    shouldBeOptions(getMatSelectBedrooms, 2);

    closeSelect(getMatSelectBedrooms);

    shouldBeOptions(getMatSelectBathrooms, 2);

    closeSelect(getMatSelectBathrooms);

    shouldBeOptions(getMatSelectMinArea, 2);

    closeSelect(getMatSelectMinArea);

    shouldBeOptions(getMatSelectMaxArea, 2);
  });
});
