describe('Change the settings parameters of the algorithm', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should add a new slot', () => {
        cy.contains('Add Slot').click();

        // Set the date
        cy.get('.input-date-container').clear().type('2025-01-01');

        // Set the start time
        cy.get('.input-time-container').eq(0).clear().type('09:00');

        // Set the end time
        cy.get('.input-time-container').eq(1).clear().type('10:30');

        // Click the "Add Slot" button
        cy.get('.e2e-location-add-slot-button').click();

        // Assert that the new slot is in the list
        cy.get('.slots-list-container') // Locate the container of the slots list
            .find('.list-group .list-group-item') // Locate each list item
            .should('have.length', 1); // Adjust this to match the expected display format

    });

    it('should not create a new slot if endtime is before start time', () => {

        cy.contains('Add Slot').click();

        // Set the date
        cy.get('.input-date-container').clear().type('2025-01-01');

        // Set the start time
        cy.get('.input-time-container').eq(0).clear().type('10:30'); // Start time after end time

        // Set the end time
        cy.get('.input-time-container').eq(1).clear().type('09:00'); // End time before start time

        // Click the "Add Slot" button
        cy.get('.e2e-location-add-slot-button').click();

        // Check that the modal is still open
        cy.get('.modal').should('be.visible');
    })

});