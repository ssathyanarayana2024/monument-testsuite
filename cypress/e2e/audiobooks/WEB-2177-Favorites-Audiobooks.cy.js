require('cypress-xpath')

describe('Favorites - Audiobooks', () => {
    beforeEach(() => {

        cy.login("toledoauto@test.com", "password")

    })

    it('Favorites AB Validations', () => {
        //Home Validation
        cy.wait(3000)
        cy.contains("My hoopla")
        cy.wait(3000)

        // Browse Dropdown - Audiobooks
        cy.contains('Browse').click()
        cy.contains('Audiobooks').click()
        cy.wait(2000)

        //  Searching and Favorite Audiobooks

        //Title 1
        cy.get('#navbar-search-input').scrollIntoView({ duration: 300 })
        cy.contains('button', 'Advanced Search').click()
        cy.get('#title').type('The Alchemist')
        cy.get('#artistName').type('Paulo Coelho')
        cy.get('#kindId').select('Audiobooks')
        cy.contains('button', 'Submit').click()
        cy.wait(2000)
        cy.get('[href="/audiobook/the-alchemist-paulo-coelho/11584658"] > .flex-1 > .w-full > .text-md').click()
        cy.get('.text-4xl').contains('The Alchemist')
        cy.wait(2000)
        cy.favoriteATitle()

        // Title 2
        cy.get('#navbar-search-input').scrollIntoView({ duration: 300 })
        cy.contains('button', 'Advanced Search').click()
        cy.get('.space-y-2 > .bg-transparent').click()
        cy.get('#title').type('Hello Single Dad')
        cy.get('#kindId').select('Audiobooks')
        cy.contains('button', 'Submit').click()
        cy.wait(2000)
        cy.get('.text-md').contains('Hello Single Dad').click()
        cy.get('.text-4xl').contains('Hello Single Dad')
        cy.wait(2000)
        cy.favoriteATitle()

        //  Title 3
        cy.get('#navbar-search-input').scrollIntoView({ duration: 300 })
        cy.contains('button', 'Advanced Search').click()
        cy.get('.space-y-2 > .bg-transparent').click()
        cy.get('#title').type('Tree House Mystery')
        cy.get('#kindId').select('Audiobooks')
        cy.contains('button', 'Submit').click()
        cy.wait(2000)
        cy.get('.text-md').contains('Tree House Mystery').click()
        cy.get('.text-4xl').contains('Tree House Mystery')
        cy.wait(2000)
        cy.favoriteATitle()

        //  Title 4
        cy.get('#navbar-search-input').scrollIntoView({ duration: 300 })
        cy.contains('button', 'Advanced Search').click()
        cy.get('.space-y-2 > .bg-transparent').click()
        cy.get('#title').type('It Ends with Us')
        cy.get('#kindId').select('Audiobooks')
        cy.contains('button', 'Submit').click()
        cy.wait(2000)
        cy.get('.text-md').contains('It Ends with Us').click()
        cy.get('.text-4xl').contains('It Ends with Us')
        cy.wait(2000)
        cy.favoriteATitle()

        //  Title 5
        cy.get('#navbar-search-input').scrollIntoView({ duration: 300 })
        cy.contains('button', 'Advanced Search').click()
        cy.get('.space-y-2 > .bg-transparent').click()
        cy.get('#title').type("Twas the Day Before Zoo Day")
        cy.get('#kindId').select('Audiobooks')
        cy.contains('button', 'Submit').click()
        cy.wait(2000)
        cy.get('.text-md').contains("Twas the Day Before Zoo Day").click()
        cy.get('.text-4xl').contains("Twas the Day Before Zoo Day")
        cy.wait(2000)
        cy.favoriteATitle()

        //  Title 6
        cy.get('#navbar-search-input').scrollIntoView({ duration: 300 })
        cy.contains('button', 'Advanced Search').click()
        cy.get('.space-y-2 > .bg-transparent').click()
        cy.get('#title').type("A Plague of Bogles")
        cy.get('#kindId').select('Audiobooks')
        cy.contains('button', 'Submit').click()
        cy.wait(2000)
        cy.get('.text-md').contains("A Plague of Bogles").click()
        cy.get('.text-4xl').contains("A Plague of Bogles")
        cy.wait(2000)
        cy.favoriteATitle()


        // My hoopla Dropdown - Favorites
        cy.contains('My hoopla').click()
        cy.contains('Favorites').click()
        cy.wait(2000)
        cy.get('.text-2xl').contains('Audiobooks')

        // Filter / Sort Validations on Favorites AB tab

        //See More Link Validation
        cy.xpath("//section[@data-automation-id='audiobook']//a[text()='See More']").click()
        cy.get('.text-4xl').should('have.text', 'Favorite Audiobooks')

        // Availability Filters Validations
        cy.get('.text-base > .flex').contains('Availability')
        cy.get('[aria-label="Currently viewing All Titles In Catalog titles"] > .select-none')
            .invoke('attr', 'class')
            .should('contain', 'blue')
        cy.get('[aria-label="Currently viewing Available Now titles"] > .select-none').click()
        cy.get('.rounded-full > .overflow-hidden').contains('Available Now')
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.wait(2000)
        cy.verifyLabelText('//p[@class="text-sm"]', ["Available"], ["Wait List", "Coming Soon", "Not In Catalog"])

        //Search Favorites
        cy.get('#favorite-search').type('Tree House Mystery{enter}')
        cy.get('.text-md').should('have.text', 'Tree House Mystery')
        cy.get('#favorite-search')
            .clear()
            .type('{enter}')

        //Borrow Type Validations
        cy.get('.mx-0 > :nth-child(2) > .flex').click()
        cy.get('[aria-label="Show Flex borrow titles only filter"]').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 500 })
        cy.get('.rounded-full > .overflow-hidden').contains('Flex')
        cy.borrowType('Flex')

        cy.get(':nth-child(2) > .overflow-y-auto > .flex').click()
        cy.wait(2000)
        cy.get('.text-4xl').scrollIntoView({ duration: 1000 })
        cy.get('[aria-label="Show Instant borrow titles only filter"]').click()
        cy.get('.text-4xl').scrollIntoView({ duration: 1000 })
        cy.get('.rounded-full > .overflow-hidden').contains('Instant')
        cy.borrowType('Instant')

        // //Sort options Validation [A-Z, Z-A, Data Added, Release Date, Default]
        cy.get(':nth-child(2) > .overflow-y-auto > .flex').click()

        cy.scrollTo('top', { ensureScrollable: false })
        cy.contains("Default").click()
        cy.wait(1000)
        cy.contains('A-Z').click()
        cy.wait(1000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(0).click()
        cy.wait(1000)
        cy.get('.text-4xl').invoke('text').should('match', /^[ABCDEFG]/)
        cy.go('back')

        cy.contains('A-Z').click()
        cy.wait(1000)
        cy.contains('Z-A').click()
        cy.wait(1000)
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(1).click()
        cy.get('.text-4xl').invoke('text').should('match', /^[ZYWVUT]/)
        cy.go('back')

        cy.contains('Z-A').click()
        cy.wait(1000)
        cy.xpath("//span[normalize-space()='Date Added']").click()
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(3).click()
        cy.wait(1000)
        cy.get('.mb-1 > p').invoke('text').should('equal', '2007')
        cy.go('back')

        cy.get('.text-4xl').scrollIntoView({ duration: 1000 })
        cy.contains('Date Added').click()
        cy.wait(1000)
        cy.xpath("//span[normalize-space()='Release Date']").click()
        cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2').eq(2).click()
        cy.wait(1000)
        cy.get('.mb-1 > p').invoke('text').should('equal', '2012')
        cy.go('back')
        
        cy.selectSortDropdownAndCaptureTitle('Release Date', 'Z-A', 'titleA').then(() => {
        cy.selectSortDropdownAndCaptureTitle('Z-A', 'Default', 'titleB' ).then(() => {
            cy.then(() => {
                const titleA = Cypress.env('titleA')
                const titleB = Cypress.env('titleB')
            cy.log(`Title A: ${titleA}`)
            cy.log(`Title B: ${titleB}`)
                expect(titleA).to.not.equal(titleB)
              })
            })
        })

        //"Children's Titles Only" Validation
        cy.get('#children').click()
        cy.get('.rounded-full > .overflow-hidden').contains("Children's Titles Only")
        cy.get('.mb-4').scrollIntoView({ duration: 1000 })
        cy.get('[aria-label="Tree House Mystery by Gertrude Chandler Warner"] > .flex-1 > .w-full > .text-md').click()
        cy.scrollTo('top', { ensureScrollable: false })
        cy.get('.mb-2 > :nth-child(2) > :nth-child(1) > a')
            .should('have.text', 'Juvenile Fiction')
        cy.go('back')

        //Clear Filters
        cy.get(':nth-child(3) > .rounded-full').click()

        //Release Date Validation
        cy.get('.mx-0 > :nth-child(3) > .flex').click()
        cy.xpath("//div[normalize-space()='Last 6 months']").click()
        cy.get('.mb-4').scrollIntoView({ duration: 1000 })
        cy.get('.rounded-full > .overflow-hidden').contains('Last 6 months')
        cy.get('.text-3xl').should('have.text', "Sorry, we couldn’t find any matches in your Favorites.")
        cy.get(':nth-child(3) > .overflow-y-auto > .flex > .select-none').click()
        cy.get('.mx-0 > :nth-child(3) > .items-center').click()

        //Date Added Validation
         cy.get('.mx-0 > :nth-child(4) > .flex').click()
         cy.get('[aria-label="Show titles added to hoopla in the Last 30 days. 0 titles."] > .select-none').click()
         cy.get('.mb-4').scrollIntoView({ duration: 1000 })
         cy.get('.rounded-full > .overflow-hidden').contains('Last 30 days')
         cy.get('.text-3xl').should('have.text', "Sorry, we couldn’t find any matches in your Favorites.")
         cy.get(':nth-child(4) > .overflow-y-auto > .flex > .select-none').click()

        //Unfavorite Titles Validations
        cy.unfavoriteTitlesFromFavoritesKindView()
        cy.get('.text-3xl').should('have.text', "Sorry, we couldn’t find any matches in your Favorites.")
        cy.log('All the steps PASSED!')

    })

})