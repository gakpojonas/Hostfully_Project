class BasePage{
    enterComputerName(computer){
        if(computer !== null){
            cy.get("#name").type(computer);
        }
    }

    enterInceptionDate(inceptionDate){
        cy.get("#introduced").type(inceptionDate);
    }

    enterEndingDate(endingDate){
        cy.get("#discontinued").type(endingDate);
    }

    chooseCompanyFromDropdown(companyName){
        cy.get("#company").select(companyName);
    }

    clickCancelBtn(){
        cy.get("a.btn").click();
    }
}

export default BasePage;