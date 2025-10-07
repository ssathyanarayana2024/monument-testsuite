require('cypress-xpath');

describe('Validate Delinquencies landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Delinquencies Landing Page Validations', () => {
        cy.contains("Delinquencies", { timeout: 10000 }) // Check if Delinquencies exists
        cy.xpath("//p[normalize-space()='Delinquencies']", { timeout: 10000 }).click() // Click on Delinquencies link

        // Verify all the column headings under Delinquencies exists in the Delinquencies page
        cy.contains('Unit')
        cy.contains('Tenant')
        cy.contains('Facility')
        cy.contains('Days Overdue')
        cy.contains('Stage')
        cy.contains('Last Outreach')
        cy.contains('Balance')
    })

})
