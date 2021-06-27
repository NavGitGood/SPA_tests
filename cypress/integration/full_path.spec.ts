/// <reference types="cypress" />
// @ts-ignore
import form_data from '../fixtures/full_data.json';

context('Full path test', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Fill all the fields', () => {
        cy.get('#income_form')
            .should('be.visible');
        cy.get('#monthlyIncome')
            .freshType(form_data.income_form.income);
        cy.selectDate("#budgetDate", form_data.income_form.budget_date)
        cy.get('#income_form button')
            .click();

        cy.wait(2000);

        cy.get('#income_form')
            .should('not.be.visible')

        cy.get("#income").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_before.income)
        });
        cy.get("#budget").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_before.budget)
        });
        cy.get("#expenses").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_before.expenses)
        });
        cy.get("#balance").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_before.balance)
        });
        cy.get("#savings").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_before.savings)
        });

        cy.get('#viewall')
            .click()

        cy.on('window:alert', (txt) => {
            expect(txt).to.equal('No Expenses Added!');
        })

        cy.get('#expenses_form')
            .should('not.be.visible')

        cy.get('#addExpense')
            .click()

        cy.get('#expenses_form')
            .should('be.visible');

        cy.get("#budget-description").invoke('text').then((text) => {
            expect(text.trim()).equal(`Your budget is Rs. ${form_data.base_page_before.budget} and will end on ${form_data.income_form.budget_date}`)
        });

        // set fixed expense
        cy.get('#expenseCategory').select(form_data.expenses[0].category);
        cy.get('#fixedExpenseType').select(form_data.expenses[0].type);
        cy.get('#expenseAmount').freshType(form_data.expenses[0].amount);
        cy.selectDate("#expenseDate", form_data.expenses[0].date)
        // submit
        cy.get('#expenses_form button')
            .click();

        cy.get('#addExpense')
            .click()

        // set variable expense
        cy.get('#expenseCategory').select(form_data.expenses[1].category);
        cy.get('#variableExpenseType').freshType(form_data.expenses[1].type);
        cy.get('#expenseAmount').freshType(form_data.expenses[1].amount);
        cy.selectDate("#expenseDate", form_data.expenses[1].date)
        // submit
        cy.get('#expenses_form button')
            .click();

        cy.wait(2000)

        cy.get("#income").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_after.income)
        });
        cy.get("#budget").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_after.budget)
        });
        cy.get("#expenses").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_after.expenses)
        });
        cy.get("#balance").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_after.balance)
        });
        cy.get("#savings").invoke('text').then((text) => {
            expect(text.trim()).equal(form_data.base_page_after.savings)
        });
    })

})

