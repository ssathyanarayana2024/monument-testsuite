require('cypress-xpath');

describe('Validate Tenants landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Tenants Landing Page Validations', () => {
        cy.contains("Tenants", { timeout: 10000 }) // Check if Tenants exists
        cy.xpath("//div[@class='MuiBox-root css-1w1104d']//p[contains(text(),'Tenants')]", { timeout: 10000 }).click() // Click on Tenants link

        cy.contains('Name')
        cy.contains('Payment Status')
        cy.contains('Contact Info')

        cy.contains('Past').click()
        cy.contains('Name')
        cy.contains('Contact Info')
        cy.contains('Facility')

    })

})
