describe('Navbar navigation', () => {
    beforeEach(() => {
        cy.visit('/'); // Adjust the base URL if needed
    });

    it('Should import a big test-data', () => {

        cy.contains('Save/Load Options').click();

        cy.get('input[type="file"]').as('fileInput');

        cy.fixture('biggerTestData.json').then(fileContent => {
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

        cy.wait(1000);

        // Click the import button
        cy.contains('Overwrite').click();

        cy.wait(500);

        //check if table is filled
        cy.get('.participant-table tbody tr').should('exist');
    });

    it('Should import a small test-data', () => {

        cy.contains('Save/Load Options').click();

        cy.get('input[type="file"]').as('fileInput');

        cy.fixture('smallTestData.json').then(fileContent => {
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

        cy.wait(500);

        // Click the import button
        cy.contains('Overwrite').click();

        cy.wait(300);

        //check if table is filled
        cy.get('.participant-table tbody tr').should('exist');
    });

});