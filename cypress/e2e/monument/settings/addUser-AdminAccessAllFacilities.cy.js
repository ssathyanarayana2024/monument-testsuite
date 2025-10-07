require('cypress-xpath');

describe('Add Admin User', () => {
    beforeEach(() => {
        cy.login("sureshs102468@gmail.com", "Blahblah2025!")
    })

    const epochTimeMs = Date.now();

    it('Add Admin User/All Facilities', () => {
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

        // Click on the "Access All Facilities" toggle switch
        cy.xpath("//input[@class='PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3']").click()
        
        // Conform the following messages are dynamically displayed after
        // toggle switch is clicked
        cy.contains("User will be able to access all existing and future facilities.")
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
        cy.contains("admin")
        // Validate Email
        cy.contains("suresh.sathyanarayana"+epochTimeMs+"@junkmail.com")
        // Validate Facility Permissions
        cy.contains("All Facilities")
        // Validate Status
        cy.contains("Invited")

    })

})
