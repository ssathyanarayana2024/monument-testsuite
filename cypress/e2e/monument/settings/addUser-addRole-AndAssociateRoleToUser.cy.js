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
      cy.contains(searchText).click()
      return;
    }

    // Scroll down by a certain amount (e.g., to the bottom)
    cy.scrollTo('bottom', { ensureScrollable: false }).then(() => {
      // Recursively call the function to scroll and check again
      scrollAndCheck(searchText, maxScrolls, currentScroll + 1);
    });
  });
}

describe('Add a new Role', () => {
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

    it('Add User/Two Facilities and Associate New Role', () => {
        cy.contains("Settings", { timeout: 10000 }) // Check if Settings exists
        cy.contains('Settings', { timeout: 10000 }).click() // Click on Settings link

        // Add User Steps
        cy.contains('Users & Permissions', { timeout: 10000 }).click()    
        cy.contains('Add User', { timeout: 10000 }).click()

        // Enter First Name, Last Name, Email and Job Title 
        // Concatinating Epoch time at the end of the string
        cy.log("THE EPOCH TIME IS : "+epochTimeMs)
        cy.get('[data-testid="firstName-input"]').type("Suresh"+epochTimeMs)
        cy.get('[data-testid="lastName-input"]').type("Sathyanarayana"+epochTimeMs)
        cy.get('[data-testid="jobTitle-input"]').type("QA Manager-"+epochTimeMs)
        cy.get('[data-testid="email-input"]').type("suresh.sathyanarayana"+epochTimeMs+"@junkmail.com")        
        // Tab out of the Job Title field
        cy.press(Cypress.Keyboard.Keys.TAB);

        // Click on the Role dropdown and then pick manager
        cy.get('[data-testid="single-select-rootRoleId"]').click()
        
        // Associate the new role to the new user       
        scrollAndCheck("DashboardViewRole"+epochTimeMs);

        // Click on the top two facilities
        cy.xpath('//*[@id="data-table-container-facilitySelector"]/table/tbody/tr[1]/td[1]/span/input').click()
        cy.xpath('//*[@id="data-table-container-facilitySelector"]/table/tbody/tr[2]/td[1]/span/input').click()
   
        // Conform the following message is dynamically displayed after
        // toggle switch is clicked
        cy.contains("An email will be sent to invite the new user.")

        // Click on Add User button to actually create the user
        cy.xpath("//p[normalize-space()='Add User']").click()
        cy.contains("User successfully created")


    })

    it('Validate above user was actually created', () => {
        cy.contains("Settings", { timeout: 10000 }) // Check if Settings exists
        cy.contains('Settings', { timeout: 10000 }).click() // Click on Settings link

        cy.contains('Users & Permissions', { timeout: 10000 }).click()    
        // Search for the user created above
        cy.get('[name="nameOrEmailSearch"]').type("Suresh"+epochTimeMs)
        cy.wait(2000)
        // Validate by First Name
        cy.contains("Suresh"+epochTimeMs)
        // Validate Role
        cy.contains("DashboardViewRole"+epochTimeMs)
        // Validate Email
        cy.contains("suresh.sathyanarayana"+epochTimeMs+"@junkmail.com")
        // Validate Facility Permissions
        cy.contains("2 Facilities")
        // Validate Status
        cy.contains("Invited")

    })


})
