describe('Participant Window', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should show "Edit Selected" and "Exit Edit Mode" buttons when in edit mode', () => {
        cy.contains('Edit List').click();
        cy.contains('Edit Selected').should('be.visible');
        cy.contains('Exit Edit Mode').should('be.visible');
    });

    it('should have disabled "Delete Selected" button when no participants are selected', () => {
        cy.contains('Edit List').click();
        cy.contains('Delete Selected').should('be.disabled');
    });

    it('should enter and exit edit mode', () => {
        cy.contains('Edit List').click();
        cy.contains('Exit Edit Mode').click();
        cy.contains('Edit Selected').should('not.exist');
    });

    // Additional test scenarios can be added here

});
