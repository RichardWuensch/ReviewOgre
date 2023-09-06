/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

describe('Import participants', () => {
    beforeEach(() => {
        // Visit the page containing the ParticipantModal component
        cy.visit('/');
    });

    it('should be able to import participants from a csv file', () => {

        // Stub the file input element's change event
        const fileName = 'participant-list.csv';
        cy.fixture('participant-list.csv').then(fileContent => {
            const blob = new Blob([fileContent], { type: 'application/csv' });
            cy.window().then(win => {
                const file = new win.File([blob], 'participants.csv', { type: 'text/csv' });
                const dataTransfer = new win.DataTransfer();
                dataTransfer.items.add(file);

                // Stub the file input element and trigger change event
                cy.get('#student-input').then(input => {
                    input[0].files = dataTransfer.files;
                    cy.get('input[type=file]').trigger('change', { force: true });
                });
            });
        });

        // Click the import button
        cy.contains('Overwrite').click();

        //check if table is filled
        cy.get('.participant-table tbody tr').should('exist');
    })


    it('should fail to import because of the wrong filetype', () => {

        // Stub the file input element's change event
        const fileName = 'participant-list.csv';
        cy.fixture('participant-list.csv').then(fileContent => {
            const blob = new Blob([fileContent], { type: 'application/csv' });
            cy.window().then(win => {
                const file = new win.File([blob], 'participants.csv', { type: 'application/csv' });
                const dataTransfer = new win.DataTransfer();
                dataTransfer.items.add(file);

                // Stub the file input element and trigger change event
                cy.get('#student-input').then(input => {
                    input[0].files = dataTransfer.files;
                    cy.get('input[type=file]').trigger('change', { force: true });
                });
            });
        });

        // Click the import button
        cy.contains('Return to Configuration').click();
    })


    it('should not import because import was aborted', () => {

        // Stub the file input element's change event
        const fileName = 'participant-list.csv';
        cy.fixture('participant-list.csv').then(fileContent => {
            const blob = new Blob([fileContent], { type: 'application/csv' });
            cy.window().then(win => {
                const file = new win.File([blob], 'participants.csv', { type: 'text/csv' });
                const dataTransfer = new win.DataTransfer();
                dataTransfer.items.add(file);

                // Stub the file input element and trigger change event
                cy.get('#student-input').then(input => {
                    input[0].files = dataTransfer.files;
                    cy.get('input[type=file]').trigger('change', { force: true });
                });
            });
        });

        // Click the import button
        cy.contains('Cancel').click();

        //check if table is filled
        cy.get('.participant-table tbody tr').should('not.exist');
    })

})