require('cypress-xpath');

describe('Validate Units landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Units Landing Page Validations', () => {
        cy.contains("Units", { timeout: 10000 }) // Check if Units exists
        cy.contains('Units').click()
        cy.contains('Individual Units')
        cy.contains('Unit')
        cy.contains('Size')

        cy.contains('Unit Groups').click()
        cy.contains('Size')
        cy.contains('Unit Group')
        cy.contains('Facility')

    })

})
