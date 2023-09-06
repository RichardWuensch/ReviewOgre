/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

describe('ParticipantModal', () => {
  beforeEach(() => {
    // Visit the page containing the ParticipantModal component
    cy.visit('/');
  });

  it('should open the modal and fill the form with valid input', () => {
    // Click the button to open the modal
    cy.contains('Add Participant').click();

    // Fill the form with valid input
    cy.get('[name="firstName"]').type('John');
    cy.get('[name="lastName"]').type('Doe');
    cy.get('[name="email"]').type('john.doe@example.com');
    cy.get('[name="group"]').type('Sample Group');
    cy.get('[name="topic"]').type('Sample Topic');

    // Choose a German Skill Level from the dropdown
    cy.get('[name="languageLevel"]').select('B1');

    // Click the "Add Participant" button
    cy.get('.participant-modal-submit').click();

    // Check if the modal is closed after clicking the "Add Participant" button
    cy.get('[data-testid="participant-modal"]').should('not.exist');
    //TODO: fix this command
  });

  it('should show validation errors for invalid input', () => {
    // Click the button to open the modal
    cy.contains('Add Participant').click();

    // Try to submit the form without filling any inputs
    cy.get('.participant-modal-submit').click();

    // Check if the validation errors are shown for all required fields
    cy.get('[name="firstName"]').should('have.class', 'is-invalid');
    cy.get('[name="lastName"]').should('have.class', 'is-invalid');
    cy.get('[name="email"]').should('have.class', 'is-invalid');
    cy.get('[name="group"]').should('have.class', 'is-invalid');
    cy.get('[name="languageLevel"]').should('not.have.class', 'is-invalid');
  });
});
