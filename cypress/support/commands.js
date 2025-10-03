// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {

	cy.visit('https://www-staging.private.hoopladigital.com/login')
	cy.wait(4000)
	cy.get('#email').type(username)
	cy.get('#password').type(password)
	cy.get('.inline-block').click()

})

Cypress.Commands.add("verifyLabelText", (locator, PositiveText = [], NegativeText = []) => {
	cy.log('verifyLabelText command called')

	cy.xpath(locator).each(($el) => {
		const text = Cypress.$($el).text().trim()
		cy.wrap($el).scrollIntoView()
		cy.wrap($el).should('be.visible')

		// At least one word should match
		if (PositiveText.length > 0) {
			let matchedWord = null

			PositiveText.some((word) => {
				if (text.includes(word)) {
					matchedWord = word
					return true
				}
				return false
			})
			cy.wrap($el).then(() => {
				expect(matchedWord).to.not.be.null
				if (matchedWord) {
					cy.log(`'${matchedWord}' title found! The positive test passed!`)
				}
			})
		}
		// None of the words should match
		if (NegativeText.length > 0) {
			NegativeText.forEach((word) => {
				cy.wrap($el).should('not.include.text', word)
				cy.log(`There is no '${word}' title in this view. The negative test passed!`)
			})
		}
	})
})

Cypress.Commands.add("verifyTitleFormat", (locator, expectedText) => {
	cy.log('verifyTitleFormat command called')

	cy.xpath(locator).then(($elements) => {
		expect($elements.length, `Expected to find titles with locator ${locator}`).to.be.greaterThan(0)
		let textFound = false
		$elements.each((index, el) => {
			const text = Cypress.$(el).text()
			if (text === expectedText) {
				textFound = true;
				cy.wrap(el).should('have.text', expectedText)
			}
		})
		expect(textFound, `Expected to find titles with text "${expectedText}"`).to.be.true
	})
})

Cypress.Commands.add('selectSortDropdownAndCaptureTitle', (dropdownStart,dropdownOption, titleVar) => {

	cy.contains(dropdownStart).click()
	cy.contains(dropdownOption).click()
	cy.wait(8000)

	cy.get('[aria-label*="by"] > .flex-1 > .w-full > .text-md')
		.eq(0)
		.should(($el) => {
			expect($el.text().trim()).to.not.be.empty;
		  })
		.invoke('text')
		.then((text) => {
			cy.log(`Captured text for ${titleVar}: ${text}`)
			Cypress.env(titleVar, text)
		})
})

Cypress.Commands.add("validateAllLinks", () => { //Links from Collections and Genres Carousel

    cy.get('div.mr-1').each(($el, index) => {
        const textA = $el.text().trim()
        cy.wait(2000)
		cy.get('div.mr-1') 
		.filter((_, el) => el.innerText.trim() === textA)
		.click()
		
		cy.log("Validating: " + textA)
       
        cy.xpath(`//h1[contains(@class, 'text-4xl') and contains(text(), "${textA}")]`)
            .scrollIntoView({ easing: 'linear', duration: 1000 })
            .then(($newElement) => {
                const textB = $newElement.text().trim()
                expect(textA, 'Text on the original page matches the text on the new page').to.equal(textB)
            })
        cy.go('back')
        cy.url().should('include', '/categories')
    })
})

Cypress.Commands.add("favoriteATitle", () => { 
cy.xpath("//*[contains(@aria-label, 'favorites')]").then((element) => {
	cy.wrap(element).invoke('attr', 'aria-label').then((ariaLabel) => {
		if (ariaLabel === 'Add title to favorites') {
			cy.log("Favorite this title in the IF step!")
			cy.wrap(element).click()
			cy.xpath("//*[name()='path' and contains(@d,'M12 21.35l')]").should('be.visible')
		} else {
			cy.log("Title already favorited. Unfavorite and redo this process in the ELSE step!")
			cy.wait(500)
			cy.xpath("//*[name()='path' and contains(@d,'M12 21.35l')]").click()
			cy.xpath('//button[@aria-label="Add title to favorites"]').click()
			cy.xpath("//*[name()='path' and contains(@d,'M12 21.35l')]").should('be.visible')
		}
	})
})
})

Cypress.Commands.add('borrowType', (type) => {
    const flexLocator = "//*[name()='path' and contains(@d,'M55.89,262')]"
    const instantLocator = "//*[name()='path' and contains(@d,'M235.096,1')]"

    const locator = type === 'Flex' ? flexLocator 
                  : type === 'Instant' ? instantLocator 
                  : null

    if (!locator) {
        throw new Error('Invalid type specified. Use "Flex" or "Instant" only.')
    }

    cy.xpath(locator).each((element) => {
        cy.wrap(element)
            .invoke('attr', 'd')
            .then((dValue) => {
                if (type === 'Flex') {
                    expect(dValue).to.include('M55.89,262')
					cy.log("Borrow type is 'FLEX'!")
                } else if (type === 'Instant') {
                    expect(dValue).to.include('M235.096,1')
					cy.log("Borrow type is 'Instant'!")
                }
            })
    })
})

Cypress.Commands.add('unfavoriteTitlesFromFavoritesKindView', () => {
    function unfavoriteNextTitle() {
      
        cy.get('body').then(($body) => {
            if ($body.find('h3.text-md.font-semibold.leading-tight.line-clamp-2').length === 0) {
                cy.log('No more titles to unfavorite.')
                return
            }
            cy.get('h3.text-md.font-semibold.leading-tight.line-clamp-2')
                .first()
                .click()
			cy.wait(2000)
            cy.xpath("//*[name()='path' and contains(@d,'M12 21.35l')]").click()
            cy.xpath('//button[@aria-label="Add title to favorites"]').should('be.visible')
            cy.go('back')
            cy.wait(2000)
            unfavoriteNextTitle()
        })
    }
    unfavoriteNextTitle()
})

