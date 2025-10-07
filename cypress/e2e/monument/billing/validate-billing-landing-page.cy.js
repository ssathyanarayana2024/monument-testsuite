require('cypress-xpath');

describe('Validate billing landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Billing Landing Page Validations', () => {
        cy.contains("Billing", { timeout: 10000 }) // Check if Billing exists
        cy.contains('Billing', { timeout: 10000 }).click() // Click on Billnig link

        // Verify all the column headings under Billing exists in the Billing page
        cy.contains('Issued Date')
        cy.contains('Invoice')
        cy.contains('Due Date') // POSSIBLE BUG HERE ?
        cy.contains('Invoice Status')
        cy.contains('Tenant')
        cy.contains('Unit')
        cy.contains('Facility')
        cy.contains('Amount')      

    })

})
