import jwt from 'jwt-simple';

describe('Routes Books', () => {
    let token;
    const Books = app.datasource.models.Books;
    const Users = app.datasource.models.Users;
    const jwtSecret = app.config.jwtSecret;
    const defaultBook = {
        id: 1,
        name: 'Default Book',
        description: 'Default Description',
    };

    beforeEach((done) => {
        Users
            .destroy({ where: {} })
            .then(() => Users.create({ name: 'John', email: 'john@mail.com', password: '123456' }))
            .then((user) => {
                Books
                    .destroy({ where: {} })
                    .then(() => Books.create(defaultBook))
                    .then(() => {
                        token = jwt.encode({ id: user.id }, jwtSecret);
                        done();
                    });
            });
    });

    describe('Route GET /books', () => {
        it('Should return a list of books', (done) => {
            request.get('/books').set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.body[0].id).to.be.eql(defaultBook.id);
                expect(res.body[0].name).to.be.eql(defaultBook.name);
                done(err);
            });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('Should return a book', (done) => {
            request.get('/books/1').set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.body.id).to.be.eql(defaultBook.id);
                expect(res.body.name).to.be.eql(defaultBook.name);
                done(err);
            });
        });
    });

    describe('Route POST /books', () => {
        it('Should create a book', (done) => {
            const newBook = { id: 2, name: 'New Book', description: 'New Description' };

            request.post('/books').send(newBook).set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.body.id).to.be.eql(newBook.id);
                expect(res.body.name).to.be.eql(newBook.name);
                done(err);
            });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('Should updated a book', (done) => {
            const updatedBook = { id: 1, name: 'Updated Book', description: 'Updated Description' };

            request.put('/books/1').set('Authorization', `JWT ${token}`).send(updatedBook).end((err, res) => {
                expect(res.body).to.be.eql([1]);
                done(err);
            });
        });
    });

    describe('Route DELETE /books/{id}', () => {
        it('Should delete a book', (done) => {
            request.delete('/books/1').set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.statusCode).to.be.eql(204);
                done(err);
            });
        });
    });
});
