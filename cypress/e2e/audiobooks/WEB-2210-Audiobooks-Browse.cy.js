require('cypress-xpath');

describe('AB Browse', () => {

	beforeEach(() => {

		cy.login("toledoauto@test.com", "password")

	})

	it('Go to AB from browse in Home Page, check see more and forward backward arrows of each carousel', () => {
 	    cy.wait(4000)
        //cy.visit('https://www-staging.private.hoopladigital.com/browse/audiobook')
        cy.contains('Browse').click()
        cy.contains('Audiobooks').click()
        cy.get('.text-4xl').should('have.text','Audiobooks')   
        //Popular Flex Audiobooks carousel
        cy.contains("Popular Flex Audiobooks")//.should('be.visible')
        cy.get(':nth-child(2) > section > .mb-2 > .flex > .mx-1').click()//click see more
        cy.get('.hidden > a').click()//go back to AB page
        cy.wait(2000)
        cy.xpath("//section[@data-automation-id='popular flex audiobooks']//button[@aria-label='Click to see next titles']").then((element) => {
            if (!element.is(':disabled')) {
            cy.wrap(element).click();
            cy.xpath("//section[@data-automation-id='popular flex audiobooks']//button[@aria-label='Click to see previous titles']").click()
            } else {
            cy.log('Element is not enabled');
            }
        });
        
        for (let i = 0; i < 5; i++) {
            cy.get('footer').scrollIntoView({ duration: 500 })
            
        }

        //Popular Instant Audiobooks carousel
        cy.contains("Popular Instant Audiobooks").scrollIntoView({ duration: 500 })//.should('be.visible')
        cy.get(':nth-child(3) > section > .mb-2 > .flex > .mx-1').click()//click see more
        cy.get('.hidden > a').click()//go back to AB page
        cy.contains("Popular Instant Audiobooks").scrollIntoView({ duration: 500 })
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[3]/section/div[1]/div/button[2]').click()//next arrow
        cy.wait(2000)
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[3]/section/div[1]/div/button[1]').click()//previous arrow

        //Featured carousel
        cy.contains("Featured").scrollIntoView({ duration: 500 })//.should('be.visible')
        cy.get(':nth-child(4) > section > .mb-2 > .flex > .mx-1').click()//click see more
        cy.get('.hidden > a').click()//go back to AB page
        cy.contains("Featured").scrollIntoView({ duration: 500 })
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[4]/section/div[1]/div/button[2]').click()//next arrow
        cy.wait(2000)
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[4]/section/div[1]/div/button[1]').click()//previous arrow

        //Genres and Collections carousel
        cy.contains("Genres and Collections").scrollIntoView({ duration: 500 })//.should('be.visible')
        cy.get(':nth-child(5) > section > .mb-2 > .flex > .mx-1').click()//click see more
        cy.get('.hidden > a').click()//go back to AB page
        cy.contains("Genres and Collections").scrollIntoView({ duration: 500 })
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[5]/section/div[1]/div/button[2]').click()//next arrow
        cy.wait(2000)
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[5]/section/div[1]/div/button[1]').click()//previous arrow

        //Trending Titles carousel
        cy.contains("Trending Titles").scrollIntoView({ duration: 500 })//.should('be.visible')
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[6]/section/div[1]/div/button[2]').click()//next arrow
        cy.wait(2000)
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[6]/section/div[1]/div/button[1]').click()//previous arrow
        cy.get(':nth-child(6) > section > .mb-2 > .flex > .mx-1').click()//click see more
        cy.go('back')  
        cy.wait(2000)
        cy.contains("Trending Titles").scrollIntoView({ duration: 500 })

        //click on static promo
        cy.xpath("//img[@alt='The Devil Wears Scrubs']").click()
        cy.wait(2000)
        cy.xpath("//img[@alt='The Devil Wears Scrubs']").should('be.visible')
        cy.get('.hidden > a').click()//go back to AB page
        
        //Recommended carousel
        for (let i = 0; i < 2; i++) {
            cy.get('footer').scrollIntoView({ duration: 500 })
            
        }
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[9]/section/div[1]/div/button[2]').click()//next arrow
        cy.wait(2000)
        cy.xpath('//*[@id="mainPageContent"]/div[2]/div[9]/section/div[1]/div/button[1]').click()//previous arrow
        cy.get(':nth-child(9) > section > .mb-2 > .flex > .mx-1').click()//click see more
        cy.get('.hidden > a').click()//go back to AB page

	})

})