require('cypress-xpath');

describe('Validate Insights landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Insights Landing Page Validations', () => {
        cy.contains("Insights", { timeout: 10000 }) // Check if Insights exists
        cy.contains('Insights', { timeout: 10000 }).click() // Click on Insights link

        cy.contains('Investors')
        cy.contains('Operations')
        cy.contains('Marketing')
        cy.contains('Revenue')
       
    })

})
