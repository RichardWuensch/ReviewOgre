/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

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