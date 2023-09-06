/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

describe('Navbar navigation', () => {
    beforeEach(() => {
        cy.visit('/'); // Adjust the base URL if needed
    });

    it('should navigate to Home page', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/');
    });

    it('should navigate to Reviews page', () => {
        cy.get('.cypress-e2e-review-page-nav').click(); // Using the specified class name
        cy.url().should('include', '/reviews');
    });

    it('should navigate to Docs page', () => {
        cy.contains('Docs').click();
        cy.url().should('include', '/docs');
    });

    it('should navigate to Home page when clicking on the logo', () => {

        cy.visit('/reviews')
        cy.get('img[alt="icon"]').click(); // Assuming the alt attribute of the image is "icon"
        cy.url().should('include', '/');
    });
});