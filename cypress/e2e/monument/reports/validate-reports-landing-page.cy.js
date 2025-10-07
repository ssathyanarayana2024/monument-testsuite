require('cypress-xpath');

describe('Validate Reports landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Reports Landing Page Validations', () => {
        cy.contains("Reports", { timeout: 10000 }) // Check if Reports exists
        cy.contains('Reports', { timeout: 10000 }).click() // Click on Reports link

        cy.contains('Management')
        cy.contains('Occupancy')
        cy.contains('Tenants')
        cy.contains('Financial')

    })

})
