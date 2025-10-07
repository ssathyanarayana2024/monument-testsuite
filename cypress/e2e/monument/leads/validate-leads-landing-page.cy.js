require('cypress-xpath');

describe('Validate Leads landing page', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    it('Leads Landing Page Validations', () => {
        cy.contains("Leads", { timeout: 10000 }) // Check if Leads exists
        cy.xpath("//div[@class='MuiBox-root css-1w1104d']//p[contains(text(),'Leads')]", { timeout: 10000 }).click() // Click on Leads link

        cy.contains('Name')
        cy.contains('Facility')
        cy.contains('Unit Group') 
        cy.contains('Available') 
        cy.contains('Lead Age') 
        cy.contains('Last Outreach') 
        cy.contains('Status') 
        cy.contains('Lead Source') 

    })

})
