# monument-testsuite

Cypress installtion instructions on Windows and Mac:

1. Install Node.js and npm
    * Download Node.js: Go to the official Node.js website : https://nodejs.org/en/download  and download the installer for your operating system (Windows or macOS). 
    * Run the Installer: Follow the prompts to install Node.js, ensuring that npm (Node Package Manager) is included. 
    * Verify Installation: Open your command prompt or terminal and run node -v and npm -v to confirm Node.js and npm are installed correctly. 

2. Create and Initialize a Project Folder 
    * Create a Project Folder: Create a new, empty folder for your Cypress project.
    * Navigate to the Folder: Open your command prompt or terminal and use the cd command to navigate into the newly created folder.
    * Initialize package.json: Run the command npm init to create a package.json file, which manages your project's dependencies.

3. Install Cypress 
    * Install Cypress: Inside your project folder, run the following command to install Cypress and add it as a development dependency:
        npm install cypress --save-dev

4. Launch Cypress 
    * Open Cypress: Once the installation is complete, run the following command to launch the Cypress application:
         npx cypress open
    * This will open the Cypress GUI app

5. To run the all tests, just click on "Run all specs" at the top