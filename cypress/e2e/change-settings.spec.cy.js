describe('Change the settings parameters of the algorithm', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should change the settings parameters of the algorithm', () => {
        cy.contains('Settings').click();

        cy.contains('Author is Notary').prev().click();
        cy.contains('Break for Moderator and Reviewer').prev().click();
        cy.contains('A/B Review').prev().click();
        cy.contains('International Groups').prev().click();
    });

});