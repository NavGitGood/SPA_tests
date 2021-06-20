/// <reference types="cypress" />

/// JSON fixture file can be loaded directly using
// the built-in JavaScript bundler
// @ts-ignore
import income_data from '../fixtures/income_data';

context('Income form', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/')
  })

  beforeEach(() => {
    cy.fixture('income_data.json').as('income')
  })

  it('cy.fixture() or require - load a fixture', function () {
    cy.get('#monthlyIncome')
    .type(income_data.value);
    cy.get("#monthlyIncome").should('have.value', income_data.value)
  })
})
