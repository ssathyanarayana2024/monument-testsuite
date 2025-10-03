require('cypress-xpath');

describe('G&C Carousel Part 1 - Collections', () => {
    beforeEach(() => {
        cy.login("toledoauto@test.com", "password")

    })

    it('Collections Links and Filters Validations', () => {
        //Home Validation
        cy.wait(3000)
        cy.contains("My hoopla")
        cy.wait(2000)

        //Browse Dropdown - Audiobooks
        cy.contains('Browse').click()
        cy.contains('Audiobooks').click()
        cy.wait(2000)

        //Audiobooks view Validation
        cy.get('.text-4xl').contains('Audiobooks')
        cy.get('footer').scrollIntoView({ duration: 300 })
        cy.get(':nth-child(5) > section > .mb-2 > .text-2xl').scrollIntoView({ duration: 300 })
        cy.get(':nth-child(5) > section > .mb-2 > .flex > .mx-1').click()
        cy.get('.text-4xl').contains('Browse Audiobooks')


        //Library Collections
        cy.get('.flex > [aria-label="collections"]').click()
        cy.wait(2000)
        cy.contains('Library Collections')


       // First 'Library Collections' Validation: 'Recently Added by Your Library'
        cy.get(':nth-child(4) > .list-none > :nth-child(1) > .flex > .mr-1').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 300 })
        cy.get('.text-4xl').contains('Recently Added by Your Library')
        cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none')
            .invoke('attr', 'class')
            .should('contain', 'blue')
        cy.get('[aria-label="Currently viewing Available Now titles"] > .select-none').click()
        cy.get('.rounded-full > .overflow-hidden').contains('Available Now')
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.wait(3000)
        cy.verifyLabelText('//p[@class="text-sm"]', ["Available"], ["Wait List", "Coming Soon", "Not In Catalog"])
        cy.get('[aria-label="Currently viewing Coming Soon titles"] > .select-none').click()

        cy.get('.rounded-full > .overflow-hidden').contains('Coming Soon')
        cy.wait(3000)
        cy.get('.mx-7 > .break-words', { timeout: 0 }).then(($el) => {
            if ($el.length > 0 && $el.text().includes('Sorry, no titles could be found.')) {
              cy.log('Sorry, no titles could be found.')
            } else {
              cy.verifyLabelText('//p[@class="text-sm"]', ["Coming Soon"], ["Available", "Wait List", "Borrowed"])
            }
          }) 
        for (let i = 0; i < 3; i++) {
            cy.go('back')
        }

        //Second 'Library Collections' Validation: "Titles You May Have Missed"
        cy.contains('Titles You May Have Missed').click()
        cy.get('.text-4xl').contains('Titles You May Have Missed')
        cy.go('back')


        //Featured Collections
        cy.contains('Featured Collections')
        cy.get(':nth-child(5) > .ml-4').click()
        cy.get('.text-4xl').contains('Featured Collections')
        cy.wait(2000)

        //First Featured Validation: "hoopla Exclusives"
        cy.get(':nth-child(1) > .flex > .mr-1').click()
        cy.get('.text-4xl').contains('hoopla Exclusives')
        cy.get('.mx-0 > :nth-child(2) > .flex').click()
        cy.get('[aria-label="Show Instant borrow titles only filter"] > .select-none').click()
        cy.get('.inline-block > .rounded-full').contains('Instant')
        cy.get('.mx-0 > :nth-child(3) > .flex').click()
        cy.get(':nth-child(3) > .overflow-y-auto > .flex').click()
        cy.get(':nth-child(2) > .rounded-full').contains('audiobook')
        cy.verifyTitleFormat('//p[contains(@class, "text-sm")]', 'audiobook')
        for (let i = 0; i < 3; i++) {
            cy.go('back')
        }
        //Second Featured Validation: "Hot on hoopla"
        cy.contains('Hot on hoopla').click()
        cy.get('.text-4xl').contains('Hot on hoopla')
        cy.go('back')

        //Third Featured Validation: "New York Times Bestsellers"
        cy.contains('New York Times Bestsellers').click()
        cy.get('.text-4xl').contains('New York Times Bestsellers')
        cy.get('[aria-label="Currently viewing All hoopla Titles titles"] > .select-none').click()
        for (let i = 0; i < 2; i++) {
            cy.get('.text-4xl').scrollIntoView({ duration: 500 })
            cy.wait(1000)
        }
        cy.get('.inline-block > .rounded-full').contains('All hoopla Titles')
        cy.wait(2000)
        cy.get('.mx-0 > :nth-child(4) > .flex').click()
        cy.get('button[aria-label*="Apply 5 star rating filter"]').click()
        cy.get(':nth-child(2) > .rounded-full').contains('User Rating: 5')
        cy.get('.mx-0 > :nth-child(5) > .flex').click()
        cy.get('button[aria-label*="Show titles released in the Last 12 months"]').click()
        cy.wait(2000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get(':nth-child(3) > .rounded-full').contains('Last 12 months')
        cy.wait(2000)
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(0).click()
        for (let i = 0; i < 6; i++) {
            cy.go('back')
        }


        //All Collections
        cy.contains('All Collections')
        cy.get(':nth-child(6) > .ml-4').click()
        cy.get('.text-4xl').contains('All Collections')

        //First 'All Collections' Validation: "Audiobooks in Italian"
        cy.contains('Audiobooks in Italian').click()
        cy.get('.text-4xl').contains('Audiobooks in Italian')
        cy.get('[aria-label="Currently viewing Recommend To Library titles"] > .select-none').click()
        cy.get('.inline-block > .rounded-full').contains('Recommend To Library')
        cy.contains("Sorry, no titles could be found.").then((element) => {
            if (element) {
                cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none').click()
            }
        })
        cy.get('.mx-0 > :nth-child(7) > .flex').click()
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').contains('Italian')
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').should('not.have.text', 'English')
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').should('not.have.text', 'Chinese')
        cy.scrollTo('top', { ensureScrollable: false })
        cy.wait(2000)
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(3).click()
        cy.get('[aria-label="This title is in the Italian language"] > a').should('have.text', "Italian")
        for (let i = 0; i < 5; i++) {
            cy.go('back')
        }

        //Second 'All Collections' Validation: "All Things Kids"
        cy.contains('All Things Kids').click()
        cy.get('.text-4xl').contains('All Things Kids')
        cy.get('[aria-label="Currently viewing Recommend To Library titles"] > .select-none').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.get('.rounded-full > .overflow-hidden').contains('Recommend To Library')
        cy.get('.mx-0 > :nth-child(2) > .flex').click()
        cy.get('[aria-label="Show Flex borrow titles only filter"] > .select-none').click()
        cy.get('.inline-block > .rounded-full').contains('Recommend To Library')
        cy.get('.inline-block > .rounded-full').contains('Flex')
        cy.scrollTo('top', { ensureScrollable: false })
        cy.contains("Default").click()
        cy.wait(2000)
        cy.contains('A-Z').click()
        cy.wait(2000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(0).click()
        cy.wait(2000)
        cy.get('.text-4xl').invoke('text').should('match', /^[ABCDEFG]/)
        for (let i = 0; i < 5; i++) {
            cy.go('back')
        }

        //Third 'All Collections' Validation: "Quick Listens: Romance"
        cy.get(':nth-child(6) > .ml-4').click()
        cy.get('.text-4xl').contains('All Collections')
        cy.contains('Quick Listens: Romance').click()
        cy.get('.text-4xl').contains('Quick Listens: Romance')
        cy.contains("Default").click()
        cy.wait(2000)
        cy.contains('Z-A').click()
        cy.wait(2000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(2).click()
        cy.get('.text-4xl').invoke('text').should('match', /^[ZYWVUT]/)
        cy.go('back')
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(6).click()
        cy.get('.text-4xl').invoke('text').should('match', /^[ZYWVUT]/)
        for (let i = 0; i < 4; i++) {
            cy.go('back')
        }
        for (let i = 0; i < 2; i++) {
            cy.get('.text-4xl').scrollIntoView({ duration: 500 })
            cy.wait(1000)
        }
    })

})
