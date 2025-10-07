require('cypress-xpath');

describe('Validate Revenue landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Revenue Landing Page Validations', () => {
        cy.contains("Revenue", { timeout: 10000 }) // Check if Reports exists
        cy.contains('Revenue', { timeout: 10000 }).click() // Click on Reports link

        cy.contains('ECRI')
        cy.contains('Eligible Units')
        cy.contains('Scheduled')

        cy.contains('Rates').click()
        cy.contains('Unit Group')
        cy.contains('Facility')

        cy.contains('Promotions').click()
        cy.contains('Name')
        cy.contains('Amount')


    })

})
