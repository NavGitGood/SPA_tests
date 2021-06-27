// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare namespace Cypress {
    interface Chainable<Subject> {
        selectDate: typeof selectDate,
        freshType: (value: string) => void
    }
}

function selectDate(id: string, date: string) {
    let day = date.split("/")[1];
    day = day.split("")[0] === "0" ? day.split("")[1] : day;
    cy.get(id)
    .click();
    cy.get('#ui-datepicker-div [data-month="5"][data-year="2021"]')
    .contains("a", day)
    .click();
}

function freshType(element, value: string) {
    // cy.get(id).clear().type(value);
    cy.wrap(element).clear().type(value);
}

Cypress.Commands.add('selectDate', selectDate)
Cypress.Commands.add('freshType', { prevSubject: true }, freshType)
