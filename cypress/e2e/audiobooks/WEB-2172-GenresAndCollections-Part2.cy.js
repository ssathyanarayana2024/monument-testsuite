require('cypress-xpath');

describe('G&C Carousel Part 2 - Genres', () => {
    beforeEach(() => {
        cy.login("toledoauto@test.com", "password")
    })

    it('All Links Quick Validations', () => {
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
        cy.get('footer').scrollIntoView({ duration: 300 })
        cy.get(':nth-child(5) > section > .mb-2 > .text-2xl').scrollIntoView({ duration: 300 })
        cy.get(':nth-child(5) > section > .mb-2 > .flex > .mx-1').click()
        cy.get('.text-4xl').contains('Browse Audiobooks')

        //Genres Validation
        cy.contains('Genres')
        cy.url().should('include', 'audiobook/categories/genres')
        cy.validateAllLinks()

    })


    it('Genres Links and Filters Validations', () => {
        //Home Validation
        cy.wait(3000)
        cy.contains("My hoopla")
        cy.wait(3000)

        //Browse Dropdown - Audiobooks
        cy.contains('Browse').click()
        cy.contains('Audiobooks').click()
        cy.wait(5000)

        //Audiobooks view Validation
        cy.get('.text-4xl').contains('Audiobooks')
        cy.wait(3000)
        cy.get('footer').scrollIntoView({ duration: 1000 })
        cy.get(':nth-child(5) > section > .mb-2 > .text-2xl').scrollIntoView({ duration: 500 })
        cy.get(':nth-child(5) > section > .mb-2 > .flex > .mx-1').click()
        cy.get('.text-4xl').contains('Browse Audiobooks')

        //Genres Validation
        cy.contains('Genres')
        cy.url().should('include', 'audiobook/categories/genres')


        // First Link Validation: 'Action & Adventure'
        cy.get(':nth-child(4) > .list-none > :nth-child(1) > .flex > .mr-1').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 300 })
        cy.get('.text-4xl').contains('Action & Adventure')

        cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none')
            .invoke('attr', 'class')
            .should('contain', 'blue')
        cy.get('[aria-label="Currently viewing Available Now titles"] > .select-none').click()
        cy.get('.rounded-full > .overflow-hidden').contains('Available Now')
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.wait(3000)
        cy.verifyLabelText('//p[@class="text-sm"]', ["Available"], ["Wait List", "Coming Soon", "Not In Catalog"])
        cy.get('[aria-label="Currently viewing Recommend To Library titles"] > .select-none').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.get('.inline-block > .rounded-full').contains('Recommend To Library')
        cy.wait(4000)

        cy.verifyLabelText('//p[@class="text-sm"]', ["Not In Catalog"], ["Available", "Wait List", "Borrowed"])
        cy.wait(3000)
        for (let i = 0; i < 3; i++) {
            cy.go('back')
        }

        cy.wait(3000)

        // Second Link Validation: 'Romance'
        cy.xpath("//div[normalize-space()='Romance']").click()
        cy.wait(4000)
        cy.get('.text-4xl').contains('Romance')
        cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none')
            .invoke('attr', 'class')
            .should('contain', 'blue')

        cy.wait(4000)

        cy.verifyLabelText('//p[@class="text-sm"]', ["Available", "Wait List", "Coming Soon"], ["Not In Catalog"])
        cy.wait(2000)
        cy.get('.mx-0 > :nth-child(2) > .flex').click()
        cy.get('[aria-label="Show Flex borrow titles only filter"] > .select-none').click()
        cy.get('.inline-block > .rounded-full').contains('Flex')
        cy.get('.mx-0 > :nth-child(5) > .flex').click()
        cy.get('button[aria-label*="Show titles released in the Last 12 months"]').click()
        cy.wait(2000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get(':nth-child(2) > .rounded-full > .overflow-hidden').contains('Last 12 months')
        cy.scrollTo('top', { ensureScrollable: false })
        cy.contains("Default").click()
        cy.wait(1000)
        cy.contains('A-Z').click()
        cy.wait(1000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(0).click()
        cy.wait(1000)
        cy.get('.text-4xl').invoke('text').should('match', /^[ABCDEFG]/)
        cy.get('.mb-1 > p').invoke('text').should('match', /[20232024]/)
        for (let i = 0; i < 5; i++) {
            cy.go('back')
        }

        // Third Link Validation: 'Fiction'
        cy.xpath("//div[normalize-space()='Fiction']").click()
        cy.get('.text-4xl').contains('Fiction')
        cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none')
            .invoke('attr', 'class')
            .should('contain', 'blue')
        cy.get('[aria-label="Currently viewing Coming Soon titles"] > .select-none').click()
        cy.get('.rounded-full > .overflow-hidden').contains('Coming Soon')
        cy.wait(2000)
        cy.contains("Sorry, no titles could be found.").then((element) => {
            if (element) {
                cy.get('[aria-label="Currently viewing All hoopla Titles titles"] > .select-none').click()
            }
        })
        for (let i = 0; i < 2; i++) {
            cy.get('.text-4xl').scrollIntoView({ duration: 500 })
            cy.wait(1000)
        }
        cy.get('.inline-block > .rounded-full').contains('All hoopla Titles')
        cy.wait(2000)
        cy.get('.mx-0 > :nth-child(4) > .flex').click()
        cy.get('button[aria-label*="Apply 5 star rating filter"]').click()
        cy.get(':nth-child(2) > .rounded-full').contains('User Rating: 5')
        cy.get('.mx-0 > :nth-child(7) > .flex').click()
        cy.contains('French').click()
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').should('not.have.text', 'English')
        cy.get(':nth-child(7) > .overflow-y-auto > .flex > .select-none').should('not.have.text', 'Chinese')

        cy.verifyTitleFormat('//p[contains(@class, "text-sm")]', 'audiobook')
        cy.get('.hidden > .w-full > :nth-child(2) > .group').click()
        cy.verifyTitleFormat('//p[contains(@class, "text-sm")]', 'audiobook')
        cy.get('.hidden > .w-full > :nth-child(1) > .group').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })

        //Validating the Sort dropdown results
        cy.selectSortDropdownAndCaptureTitle('Default', 'Popularity', 'titleA').then(() => {
            cy.selectSortDropdownAndCaptureTitle('Popularity', 'Release Date', 'titleB').then(() => {
                cy.then(() => {
                    const titleA = Cypress.env('titleA')
                    const titleB = Cypress.env('titleB')
                    cy.log(`Title A: ${titleA}`)
                    cy.log(`Title B: ${titleB}`)
                    expect(titleA).to.not.equal(titleB)
                })
            })
        })

        cy.get('.cursor-pointer > :nth-child(4) > .rounded-full').click()
        cy.get('[href="/audiobook/categories/genres"]').click()


        // 4th Link Validation: "Drama"
        cy.xpath("//div[normalize-space()='Drama']").click()
        cy.get('.text-4xl').contains('Drama')
        cy.go('back')
        cy.url().should('include', 'audiobook/categories/genres')

        // 5th Link Validation: "Mystery"
        cy.xpath("//div[normalize-space()='Mystery']").click()
        cy.get('.text-4xl').contains('Mystery')
        cy.go('back')
        cy.url().should('include', 'audiobook/categories/genres')

        // 6th Link Validation: "Sci-Fi & Fantasy"
        cy.xpath("//div[normalize-space()='Sci-Fi & Fantasy']").click()
        cy.get('.text-4xl').contains('Sci-Fi & Fantasy')
        cy.go('back')
        cy.url().should('include', 'audiobook/categories/genres')

        // 7th Link Validation: "Nonfiction"
        cy.xpath("//div[normalize-space()='Nonfiction']").click()
        cy.get('.text-4xl').contains('Nonfiction')
        cy.go('back')
        cy.url().should('include', 'audiobook/categories/genres')

    })

})
