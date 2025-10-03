require('cypress-xpath');

describe('AB Carousels', () => {

	beforeEach(() => {
		
		cy.login("toledoauto@test.com", "password")	

	})

	it('Checks www AB carousels', () => {
 	  cy.wait(2000)
       cy.visit('https://www-staging.private.hoopladigital.com/browse/audiobook')
       cy.wait(2000)
       cy.get('.text-4xl').should('have.text','Audiobooks') 
       //Popular Flex AB
       cy.wait(2000)
       cy.get(':nth-child(2) > section > .mb-2 > .flex > .mx-1').click()//click see more Popular Flex AB
       cy.get('.text-4xl')
       cy.get('.rounded-full > .overflow-hidden').contains('Flex')
       cy.get('.hidden > a').click()
       cy.get(':nth-child(2) > section > .slick-slider > .slick-list > .slick-track > .slick-active > :nth-child(1) > .pb-4 > .shadow-sm > .h-48 > .min-h-0 > .flex > .relative').click()     
       cy.get('#mainPageContent > .items-start')
       cy.get('.hidden > a').click()

       //Popular Instant AB
       cy.contains("Popular Instant Audiobooks").scrollIntoView({ duration: 500 })
       cy.get(':nth-child(3) > section > .slick-slider > .slick-list > .slick-track > .slick-active > :nth-child(1) > .pb-4 > .shadow-sm > .h-48 > .min-h-0 > .flex > .relative').click()
       cy.get('#mainPageContent > .items-start')
       cy.get('.hidden > a').click()
       cy.contains("Popular Instant Audiobooks").scrollIntoView({ duration: 500 })
       cy.get(':nth-child(3) > section > .mb-2 > .flex > .mx-1').click()//click see more Popular Instant AB
       cy.get('.text-4xl')
       cy.get('.rounded-full > .overflow-hidden').contains('Instant')
       cy.get('.hidden > a').click()

       //Featured
       cy.contains("Featured").scrollIntoView({ duration: 500 })
       cy.get(':nth-child(4) > section > .slick-slider > .slick-list > .slick-track > .slick-active > :nth-child(1) > .pb-4 > .shadow-sm > .h-48 > .min-h-0 > .flex > .relative').click()
       cy.get('#mainPageContent > .items-start')
       cy.get('.hidden > a').click()
       cy.contains("Featured").scrollIntoView({ duration: 500 })
       cy.get(':nth-child(4) > section > .mb-2 > .flex > .mx-1').click()//click see more Featured AB
       cy.get('.text-4xl').contains('Featured Audiobooks')
       cy.get('.hidden > a').click()

       //Trending Titles
    for (let i = 0; i < 1; i++) {
        cy.get('footer').scrollIntoView({ duration: 500 })
        
    }
    cy.get(':nth-child(6) > section > .slick-slider > .slick-list > .slick-track > .slick-active > :nth-child(1) > .pb-4 > .shadow-sm > .h-48 > .min-h-0 > .flex > .relative').click()
    cy.get('#mainPageContent > .items-start')
    cy.get('.hidden > a').click() 
    for (let i = 0; i < 1; i++) {
        cy.get('footer').scrollIntoView({ duration: 500 })
        
    }
      cy.get(':nth-child(6) > section > .mb-2 > .flex > .mx-1').click()//click see more Trending AB
        cy.get('.text-4xl').contains('Trending Audiobooks')
        cy.get('.hidden > a').click()
           

        //Recommended Titles
        for (let i = 0; i < 1; i++) {
            cy.get('footer').scrollIntoView({ duration: 500 })
            
        }
    cy.get(':nth-child(9) > section > .slick-slider > .slick-list > .slick-track > .slick-active > :nth-child(1) > .pb-4 > .shadow-sm > .h-48 > .min-h-0 > .flex > .relative').click()
    cy.get('#mainPageContent > .items-start')
    cy.get('.hidden > a').click() 
    for (let i = 0; i < 1; i++) {
        cy.get('footer').scrollIntoView({ duration: 500 })
        
    }
         cy.get(':nth-child(9) > section > .mb-2 > .flex > .mx-1').click()//click see more Recommended AB
        cy.get('.text-4xl').contains('Recommended Audiobooks')
        cy.get('.hidden > a').click()//go back to AB page

        //Filter options
        cy.contains("Popular Flex Audiobooks").scrollIntoView({ duration: 500 })

       //All Title in Catalog 
       cy.get(':nth-child(2) > section > .mb-2 > .flex > .mx-1').click()
       cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none')
            .invoke('attr', 'class')
            .should('contain', 'blue');

        //Available Now    
        cy.get('[aria-label="Currently viewing Available Now titles"] > .select-none').click()
        cy.get('.rounded-full > .overflow-hidden').contains('Available Now')
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.wait(3000)
        cy.verifyLabelText('//p[@class="text-sm"]', ["Available"], ["Wait List", "Coming Soon", "Not In Catalog"])

        //Coming Soon
        cy.get('[aria-label="Currently viewing Coming Soon titles"] > .select-none').click()
        cy.get('.rounded-full > .overflow-hidden').contains('Coming Soon')
        cy.wait(3000)
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        if(cy.get('.mx-7 > .break-words').should('have.text', "Sorry, no titles could be found."))
            {
                cy.log("coming soon filter has no titles")
            }
            else
            {
                cy.verifyLabelText('//p[@class="text-sm"]', ["Coming Soon"], ["Available", "Wait List", "Borrowed"])
            }

        //All hoopla Titles   
        cy.get('[aria-label="Currently viewing All hoopla Titles titles"] > .select-none').click()
        for (let i = 0; i < 2; i++) {
            cy.get('.text-4xl').scrollIntoView({ duration: 500 })
            cy.wait(2000)
        }
        cy.get('.inline-block > .rounded-full').contains('All hoopla Titles')
        cy.wait(3000)

        //Recommend to Library
        cy.get('[aria-label="Currently viewing Recommend To Library titles"] > .select-none').click()
        cy.get('.inline-block > .rounded-full').contains('Recommend To Library')

        //User rating
        cy.get('.mx-0 > :nth-child(4) > .flex').click()
        cy.get('button[aria-label*="Apply 4 stars and up rating filter"]').click()
        cy.get(':nth-child(3) > .rounded-full > .overflow-hidden').contains('User Rating: 4')

        //Release Date
        cy.get('.mx-0 > :nth-child(5) > .flex').click()
        cy.get('button[aria-label*="Show titles released in the Last 12 months"]').click()
        cy.wait(2000)
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.get(':nth-child(4) > .rounded-full > .overflow-hidden').contains('Release Date: Last 12 months')

        //Date Added
        for (let i = 0; i < 5; i++) {
            cy.get('footer').scrollIntoView({ duration: 500 })
            
        }
        cy.get('.mx-0 > :nth-child(6) > .flex').click()
        cy.get('button[aria-label*="Show titles added to hoopla in the Last 12 months"]').click()
        cy.wait(2000)
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.get(':nth-child(5) > .rounded-full > .overflow-hidden').contains('Date Added: Last 12 months')

        //Language
        for (let i = 0; i < 5; i++) {
            cy.get('footer').scrollIntoView({ duration: 500 })
            
        }
        cy.get('.mx-0 > :nth-child(7) > .flex').click() 
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').contains('English').click()
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').should('not.have.text', 'Italian')
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').should('not.have.text', 'Chinese')
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.wait(2000)
        cy.get(':nth-child(6) > .rounded-full > .overflow-hidden').contains('Language: English')
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(2).click()
        cy.get('[aria-label="This title is in the English language"] > span').should('have.text',"English")
        cy.go('back')
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })

        cy.get(':nth-child(7) > .rounded-full').click() //Clear all filters
	})

})
