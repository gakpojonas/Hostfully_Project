import BasePage from "./BasePage";

class AddNewComputerPage extends BasePage{

    clickCreateComputerBtn(){
        cy.get("[type='submit']").click();
    }

}

export default AddNewComputerPage;