/// <reference types="cypress" />

context('Form visibilty', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
    })

    it('income_form to be visible', () => {
        cy.get('#income_form')
            .should('be.visible')
    })

    it('budget_form to be not visible', () => {
        cy.get('#budget_form')
            .should('not.be.visible')
    })

    it('expenses_form to be visible', () => {
        cy.get('#expenses_form')
            .should('not.be.visible')
    })
})

