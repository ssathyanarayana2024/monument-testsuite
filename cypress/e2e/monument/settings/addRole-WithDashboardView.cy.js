require('cypress-xpath');

function scrollAndCheck(searchText, maxScrolls = 10, currentScroll = 0) {
  if (currentScroll >= maxScrolls) {
    // If maxScrolls reached, assert that the text was not found
    cy.contains(searchText).should('exist'); // This will fail if not found
    return;
  }

  cy.window().then(($window) => {
    // Check if the text is already visible in the current view
    if ($window.document.body.innerText.includes(searchText)) {
      cy.log(`Found "${searchText}" after ${currentScroll} scrolls.`);
      cy.contains(searchText).should('be.visible'); // Assert visibility
      return;
    }

    // Scroll down by a certain amount (e.g., to the bottom)
    cy.scrollTo('bottom', { ensureScrollable: false }).then(() => {
      // Recursively call the function to scroll and check again
      scrollAndCheck(searchText, maxScrolls, currentScroll + 1);
    });
  });
}


describe('Add Dashboard Role', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    const epochTimeMs = Date.now();
     
    it('Add Dashboard Role With View Only', () => {
        cy.contains("Settings", { timeout: 10000 }) // Check if Settings exists
        cy.contains('Settings', { timeout: 10000 }).click() // Click on Settings link

        // Add Role Steps
        cy.contains('Users & Permissions', { timeout: 10000 }).click()
        cy.contains("Roles").click() 
        cy.contains('Add Role', { timeout: 10000 }).click()
        cy.get('[data-testid="name-input"]').type("DashboardViewRole"+epochTimeMs)
        cy.get('[name="permissions.autopayWidget.canView"]').click()
        cy.get('[name="permissions.delinquencyWidget.canView"]').click()
        cy.get('[name="permissions.ecriWidget.canView"]').click()
        cy.get('[name="permissions.eligibleTenantsWidget.canView"]').click()
        cy.get('[name="permissions.insuranceWidget.canView"]').click()
        cy.get('[name="permissions.leadsWidget.canView"]').click()
        cy.get('[name="permissions.netMoveInsWidget.canView"]').click()
        cy.get('[name="permissions.occupancyWidget.canView"]').click()
        cy.get('[name="permissions.revenueWidget.canView"]').click()
        cy.get('[name="permissions.occupancyWidget.canView"]').click()

        // Click on Save Permissions
        cy.contains("Save Permissions").click()

        // Validate Role created message
        cy.contains("Role created")

    })

    it('Validate above role was actually created', () => {
        cy.contains("Settings", { timeout: 10000 }) // Check if Settings exists
        cy.contains('Settings', { timeout: 10000 }).click() // Click on Settings link

        cy.contains('Users & Permissions', { timeout: 10000 }).click()
        cy.contains("Roles").click() 

        // Search for the role created above
        scrollAndCheck("DashboardViewRole"+epochTimeMs);
    })

})
