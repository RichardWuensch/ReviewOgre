describe('Run Algorithm', () => {

    beforeEach(() => {
        cy.visit('/');
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

    function prepareData(fileName) {
        cy.contains('Save/Load Options').click();

        cy.get('input[type="file"]').as('fileInput');

        importTestData(fileName);

        // Click the import button
        cy.contains('Overwrite').click();

        cy.wait(500);
    }

    it('should run the algorithm successfully with the big testdata', () => {

        prepareData('biggerTestData.json');

        cy.get('.e2e-testing-compute-assignment').click();

        cy.wait(1500);

        //User will only be forwarded to this page if algorithm was successful
        cy.url().should('include', '/reviews');
    })

    it('should run the algorithm successfully with the small test data', () => {

        prepareData('smallTestData.json');

        cy.get('.e2e-testing-compute-assignment').click();

        cy.wait(1500);

        //User will only be forwarded to this page if algorithm was successful
        cy.url().should('include', '/reviews');
    });

    it('should not be able to run the algorithm - too few participants', () => {

        prepareData('smallTestDataTooFewParticipants.json');

        cy.get('.e2e-testing-compute-assignment').click();

        cy.wait(1500);

        //User will stay on the main page if algorithm was unsuccessful
        cy.url().should('not.include', '/reviews');

        //Failed precheck shown
        cy.get('.modal-exit-icon').should('be.visible');
    });

    it('should not be able to run the algorithm - too few rooms', () => {

        prepareData('smallTestDataTooFewRooms.json');

        cy.get('.e2e-testing-compute-assignment').click();

        cy.wait(1500);

        //User will stay on the main page if algorithm was unsuccessful
        cy.url().should('not.include', '/reviews');

        //Failed precheck shown
        cy.get('.modal-exit-icon').should('be.visible');
    });

    it('should fail to run the algorithm on no data', () => {

        cy.get('.e2e-testing-compute-assignment').click();

        cy.wait(1500);

        //User will stay on the main page if algorithm was unsuccessful
        cy.url().should('not.include', '/reviews');

        //Failed precheck shown
        cy.get('.modal-exit-icon').should('be.visible');
    })

})