require('cypress-xpath');

describe('Validate Communications landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Communications Landing Page Validations', () => {
        cy.contains("Communications", { timeout: 10000 }) // Check if Communications exists
        cy.contains('Communications', { timeout: 10000 }).click() // Click on Communications link

        cy.contains('Recipient Type')
        cy.contains('Read Status') 
    })

})
