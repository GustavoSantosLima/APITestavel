import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
    describe('Get all books: getAll()', () => {
        it('Should return a list of books', () => {
            const Books = {
                findAll: td.function(),
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2017-02-22T17:00:00.69ZZ',
                updated_at: '2017-02-22T17:00:00.69ZZ',
            }];

            td.when(Books.findAll({})).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);
            return booksController.getAll()
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Get a books: getById()', () => {
        it('Should return a books', () => {
            const Books = {
                findOne: td.function(),
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2017-02-22T17:00:00.69ZZ',
                updated_at: '2017-02-22T17:00:00.69ZZ',
            }];

            td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);
            return booksController.getById({ id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Create a books: create()', () => {
        it('Should create a books', () => {
            const Books = {
                create: td.function(),
            };

            const requestBody = {
                name: 'Test Book',
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2017-02-22T17:00:00.69ZZ',
                updated_at: '2017-02-22T17:00:00.69ZZ',
            }];

            td.when(Books.create(requestBody)).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);
            return booksController.create(requestBody)
                .then((response) => {
                    expect(response.statusCode).to.be.eql(201);
                    expect(response.data).to.be.eql(expectedResponse);
                });
        });
    });

    describe('Update a books: update()', () => {
        it('Should update a books', () => {
            const Books = {
                update: td.function(),
            };

            const requestBody = {
                id: 2,
                name: 'Update Book',
            };

            const expectedResponse = [{
                id: 2,
                name: 'Update Book',
                created_at: '2017-02-22T17:00:00.69ZZ',
                updated_at: '2017-02-22T17:00:00.69ZZ',
            }];

            td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);
            return booksController.update(requestBody, { id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Delete a books: delete()', () => {
        it('Should delete a books', () => {
            const Books = {
                destroy: td.function(),
            };

            td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});

            const booksController = new BooksController(Books);
            return booksController.delete({ id: 1 })
                .then(response => expect(response.statusCode).to.be.eql(204));
        });
    });
});
