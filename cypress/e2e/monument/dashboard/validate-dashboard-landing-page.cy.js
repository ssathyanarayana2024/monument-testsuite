require('cypress-xpath');

describe('Validate Dashboard landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Dashboard Landing Page Validations', () => {
        cy.contains("Dashboard", { timeout: 10000 }) // Check if Dashboard exists
        cy.contains('Dashboard', { timeout: 10000 }).click() // Click on Dashboard link

        // Verify all the telemetry headings under Dashboard exists in the Dashboard page
        cy.contains('Occupancy')
        cy.contains('Revenue')
        cy.contains('Net Move-Ins')
        cy.contains('Leads')
        cy.contains('Past Due')
        cy.contains('Unit Status')
        cy.contains('Tenant Coverage')
        cy.contains('Autopay')        
    })

})
