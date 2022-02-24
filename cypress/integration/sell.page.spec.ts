import { eValidationErrorMessage } from 'app/widgets/directives/show-validation-error/validations';

const matInputNameTestID = "[data-testid='mat-input-name']";
const matInputNameErrorTestID = "[data-testid='mat-input-name-error']";
const matSelectTypeTestID = "[data-testid='mat-select-type']";
const matSelectKindTypeTestID = "[data-testid='mat-select-kind-type']";
const matInputZipCodeTestID = "[data-testid='mat-input-zip-code']";
const matInputValueTestID = "[data-testid='mat-input-value']";
const matInputCondominiumTestID = "[data-testid='mat-input-condominium']";
const matInputBedRoomsTestID = "[data-testid='mat-input-bed-rooms']";
const matInputBathRoomsTestID = "[data-testid='mat-input-bath-rooms']";
const matSelectFurnishedTestID = "[data-testid='mat-select-furnished']";
const matInputAreaTestID = "[data-testid='mat-input-area']";
const inputFileTestID = "[data-testid='input-file']";
const matButtonSubmitTestID = "[data-testid='mat-button-submit']";

const getMatInputBedRooms = () => cy.get(matInputBedRoomsTestID);
const getMatInputBathRooms = () => cy.get(matInputBathRoomsTestID);
const getMatSelectFurnished = () =>
  cy.get<HTMLSelectElement>(matSelectFurnishedTestID);
const getMatInputArea = () => cy.get(matInputAreaTestID);
const getInputFile = () => cy.get(inputFileTestID);
const getMatButtonSubmit = () => cy.get(matButtonSubmitTestID);
const getMatInputCondominium = () => cy.get(matInputCondominiumTestID);
const getMatInputValue = () => cy.get(matInputValueTestID);
const getMatInputZipCode = () => cy.get(matInputZipCodeTestID);
const getMatSelectKindType = () =>
  cy.get<HTMLSelectElement>(matSelectKindTypeTestID);
const getMatInputName = () => cy.get(matInputNameTestID);
const getMatInputNameError = () => cy.get(matInputNameErrorTestID);
const getMatSelectType = () => cy.get<HTMLSelectElement>(matSelectTypeTestID);

const matSelect = (
  select: () => Cypress.Chainable<JQuery<HTMLSelectElement>>,
  value: string
) =>
  select()
    .click()
    .then(() => {
      cy.get('mat-option').contains(value).click();
    });
describe('SellPage', () => {
  beforeEach(() => {
    cy.visit('/sell');
  });
  it('should show field wrong with the error message', () => {
    getMatInputNameError().should(
      'contain.html',
      eValidationErrorMessage.REQUIRED
    );
  });

  it('should register new property', () => {
    getMatInputName().type('Tony Stark');
    matSelect(getMatSelectType, 'House');
    getMatInputZipCode().type('06472-020').click();
    matSelect(getMatSelectKindType, 'Sale');
    getMatInputValue().type('1000000');
    getMatInputCondominium().type('500');
    getMatInputBedRooms().type('20');
    getMatInputBathRooms().type('5');
    matSelect(getMatSelectFurnished, 'Yes');
    getMatInputArea().type('800');
    getInputFile().selectFile('cypress/fixtures/1.jpg', { force: true });
    getMatInputArea().click();
    getMatButtonSubmit().click();
  });
});
