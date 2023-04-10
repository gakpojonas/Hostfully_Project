class HomePage{

    clickAddNewComputerBtn(){
        cy.get("#add").click();
    }

    displayText(){
        cy.get(".alert-message");
    }

    searchBoxField(computerName){
        cy.get("#searchbox").type(computerName);
    }

    clickFilterByNameBtn(){
        cy.get("#searchsubmit").click();
    }

    clickFirstComputer(){
        cy.get("tbody > tr > :nth-child(1) > a").first().click();
    }
}

export default HomePage;