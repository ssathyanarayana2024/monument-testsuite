require('cypress-xpath');

describe('validate settings landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Settigngs Landing Page Validations', () => {
        cy.contains("Settings", { timeout: 10000 }) // Check if Settings exists
        cy.contains('Settings', { timeout: 10000 }).click() // Click on Settings link

        // Verify all the functionality in the left pane in the Settings page
        cy.contains('Users & Permissions')
        cy.contains('Facility Management')
        cy.contains('Access Management') // POSSIBLE BUG HERE ?
        cy.contains('Lease Management')
        cy.contains('Billing & Taxes')
        cy.contains('Template Library')
        cy.contains('My Storefront')
        

    })

})
