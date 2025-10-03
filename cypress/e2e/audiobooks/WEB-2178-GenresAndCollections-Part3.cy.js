require('cypress-xpath');

describe('G&C Carousel Part 3 - Search', () => {
    beforeEach(() => {
        cy.login("toledoauto@test.com", "password")
    })

    it('Search Genres and Collections Validation', () => {
        //Home Validation
        cy.wait(3000)
        cy.contains("My hoopla")
        cy.wait(3000)

        //Browse Dropdown - Audiobooks
        cy.contains('Browse').click()
        cy.contains('Audiobooks').click()
        cy.wait(2000)

        //Audiobooks view Validation
        cy.get('.text-4xl').contains('Audiobooks')
        cy.wait(2000)
        cy.get('footer').scrollIntoView({ duration: 300 })
        cy.wait(3000)
        cy.get(':nth-child(5) > section > .mb-2 > .text-2xl').scrollIntoView({ duration: 300 })
        cy.get(':nth-child(5) > section > .mb-2 > .flex > .mx-1').click()
        cy.get('.text-4xl').contains('Browse Audiobooks')

        //Genres Validation
        // cy.get('.flex > [aria-label="search"]').click()
        // cy.url().should('include', 'audiobook/categories/search')
        // cy.get('#category-search').type('Romance{enter}')
        // cy.wait(2000)
        // cy.xpath('//h2[normalize-space()="Collections"]').contains('Collections')
        // cy.get(':nth-child(5) > .list-none > :nth-child(1) > .flex > .mr-1').contains('Romance')
        // cy.get(':nth-child(5) > .list-none > :nth-child(2) > .flex > .mr-1').contains('Romance')
        // cy.get(':nth-child(6) > .mb-2\.5').contains('Genres')
    

    })

})