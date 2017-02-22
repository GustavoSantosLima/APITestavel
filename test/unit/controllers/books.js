import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
    describe('Get all books: getAll()', () => {
        it('Should return a list of books', () => {
            const Books = {
                findAll: td.function()
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2017-02-22T17:00:00.69ZZ',
                updated_at: '2017-02-22T17:00:00.69ZZ'
            }];

            td.when(Books.findAll({})).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);
            return booksController.getAll()
                .then(response => expect(response).to.be.eql(expectedResponse));
        });
    });
});