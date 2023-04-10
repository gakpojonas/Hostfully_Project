import BasePage from "./BasePage";

class EditComputerPage extends BasePage{

    deleteComputerBtn(){
        cy.get(".topbar").invoke("css", "display", "none");
        cy.get("[value='Delete this computer']").click();
    }

    clearComputerNameFromField(){
        cy.get("#name").clear();
    }

    clickSaveComputerBtn(){
        cy.get("[value='Save this computer']").click();
    }
}

export default EditComputerPage;