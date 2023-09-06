/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

describe('Navbar navigation', () => {
    beforeEach(() => {
        cy.visit('/'); // Adjust the base URL if needed
    });

    function importTestData(filename) {
        cy.contains('Save/Load Options').click();

        cy.get('input[type="file"]').as('fileInput');

        cy.fixture(filename).then(fileContent => {
            const blob = new Blob([JSON.stringify(fileContent)], { type: 'application/json' });
            const testFile = new File([blob], 'testData.json', { type: 'application/json' });

            // Stub the file input element and trigger change event
            cy.get('input.e2e-testing-load-state').as('fileInput');
            cy.get('@fileInput').then(input => {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(testFile);
                input[0].files = dataTransfer.files;
                cy.get('@fileInput').trigger('change', { force: true });
            });

        });

        cy.wait(700);
    }

    it('Should import a big test-data', () => {

        cy.contains('Save/Load Options').click();

        cy.get('input[type="file"]').as('fileInput');

        importTestData('biggerTestData.json');

        // Click the import button
        cy.contains('Overwrite').click();

        cy.wait(500);

        //check if table is filled
        cy.get('.participant-table tbody tr').should('exist');
    });

    it('Should import a small test-data', () => {

        cy.contains('Save/Load Options').click();

        cy.get('input[type="file"]').as('fileInput');

        importTestData('smallTestData.json');

        // Click the import button
        cy.contains('Overwrite').click();

        cy.wait(300);

        //check if table is filled
        cy.get('.participant-table tbody tr').should('exist');
    });

});