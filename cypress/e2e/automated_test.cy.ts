import HomePage from "../Pages/HomePage";
import AddNewComputerPage from "../Pages/AddNewComputerPage";
import EditComputerPage from "../Pages/EditComputerPage";

describe("Tests on Computer Database",() => {
    let newComputerName = "Hp Spectre 360";
    let existingComputer = "ARRA";
    let validInceptionDate = "2000-04-06";
    let InvalidInceptionDate = "2025-10-10";
    let validEndingDate = "2023-01-01";
    let companyName = "Netronics";

    const homePage = new HomePage();
    const addNewComputerPage = new AddNewComputerPage();
    const editComputerPage = new EditComputerPage();

    beforeEach(() => {
        cy.visit("https://computer-database.gatling.io/computers");
    })


    it("Add a new computer to the database", () => {   
        cy.log("Clicking add new computer button...");
        homePage.clickAddNewComputerBtn();

        cy.log("Entering details of computer to be added...");
        addNewComputerPage.enterComputerName(newComputerName);
        addNewComputerPage.enterInceptionDate(validInceptionDate);
        addNewComputerPage.enterEndingDate(validEndingDate);
        addNewComputerPage.chooseCompanyFromDropdown(companyName);

        cy.log("Clicking on Create this computer button to add to database...");
        addNewComputerPage.clickCreateComputerBtn();

        cy.log("Verifying whether the Database contains the new computer...");
        cy.get(".alert-message").should("contain.text", newComputerName); 
    })


    it("Verify ability to update an existing computer in the database", () => {

        cy.log("Entering computer to be updated in search box...");
        homePage.searchBoxField(existingComputer);
        homePage.clickFilterByNameBtn();

        cy.log("Redirecting to Edit computer page...");
        homePage.clickFirstComputer();

        cy.log("Entering new computer Details...");
        editComputerPage.clearComputerNameFromField();
        editComputerPage.enterComputerName(newComputerName);
        editComputerPage.enterInceptionDate(validInceptionDate);
        editComputerPage.enterEndingDate(validEndingDate);
        editComputerPage.chooseCompanyFromDropdown(companyName);

        cy.log("Clicking on Save this computer button to add to database...");
        editComputerPage.clickSaveComputerBtn();
    
        cy.log("Verifying whether the updated computer is added to the database...");
        cy.get(".alert-message").should("contain.text", newComputerName);
    })


    it("Verify ability to delete an existing computer from the database", () => {

        cy.log("Entering computer to be deleted in search box...");
        homePage.searchBoxField(existingComputer);
        homePage.clickFilterByNameBtn();

        cy.log("Redirecting to Edit computer page...");
        homePage.clickFirstComputer();

        cy.log("Deleting the selected computer...");
        editComputerPage.deleteComputerBtn();

        cy.log("Verifying whether the computer is deleted from the database");
        cy.get(".alert-message").should("contain.text", "Computer" + " " + existingComputer + " " + "has been deleted");
    })

    
    it("Edit an existing computer and cancel changes", () => {

        cy.log("Entering computer to be edited in search box...");
        homePage.searchBoxField(existingComputer);
        homePage.clickFilterByNameBtn();

        cy.log("Finding first computer and click...");
        homePage.clickFirstComputer();

        cy.log("Entering details to edit an existing computer...")
        editComputerPage.clearComputerNameFromField();
        editComputerPage.enterComputerName(newComputerName);
        editComputerPage.enterInceptionDate(validInceptionDate);
        editComputerPage.enterEndingDate(validEndingDate);
        editComputerPage.chooseCompanyFromDropdown(companyName);

        cy.log("Clicking cancel button to return to hompegae");
        editComputerPage.clickCancelBtn();

        cy.log("Verify whether the hompage is returned matching the exact URL and Text");
        cy.url().should("eq", "https://computer-database.gatling.io/computers");
        cy.get("#main > h1").should("have.text", "574 computers found");
    })


    it("Search for a non-existent computer", () => {
        cy.log("Entering a non existent computer in the search box...");
        homePage.searchBoxField("Macbook Pro 360");
        homePage.clickFilterByNameBtn();

        cy.log("Verifying the non-existent of the computer on the homepage");
        cy.get(".well").should("have.text", "Nothing to display");
    })


    it("Add a computer with an invalid date", () => {

        cy.log("Clicking add new computer button...");
        homePage.clickAddNewComputerBtn();

        cy.log("Entering details of computer to be added...");
        addNewComputerPage.enterComputerName(newComputerName);
        addNewComputerPage.enterInceptionDate(InvalidInceptionDate);
        addNewComputerPage.enterEndingDate(validEndingDate);
        addNewComputerPage.chooseCompanyFromDropdown(companyName);

        cy.log("Clicking on Create this computer button to add to database...");
        addNewComputerPage.clickCreateComputerBtn();

        cy.log("Verifying the display of error message...");
        cy.get(".error > .input > .help-inline").should("have.text", "Discontinued date is before introduction date");
    })


    it("Add a computer without a name", () => {
        cy.log("Clicking add new computer button...");
        homePage.clickAddNewComputerBtn();
    
        cy.log("Entering details of computer to be added...");
        addNewComputerPage.enterComputerName(null);
        addNewComputerPage.enterInceptionDate(validInceptionDate);
        addNewComputerPage.enterEndingDate(validEndingDate);
        addNewComputerPage.chooseCompanyFromDropdown(companyName);
    
        cy.log("Clicking on Create this computer button to add to database...");
        addNewComputerPage.clickCreateComputerBtn();
    
        cy.log("Verifying the display of error message...");
        cy.get(".error > .input > .help-inline").should("have.text", "Failed to refine type : Predicate isEmpty() did not fail.");
    })
})