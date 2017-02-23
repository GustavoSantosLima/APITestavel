import jwt from 'jwt-simple';

describe('Routes Users', () => {
    let token;
    const Users = app.datasource.models.Users;
    const jwtSecret = app.config.jwtSecret;
    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'test@test.com',
        password: '123456',
    };

    beforeEach((done) => {
        Users
            .destroy({ where: {} })
            .then(() => Users.create({ name: 'John', email: 'john@mail.com', password: '123456' }))
            .then((user) => {
                Users.create(defaultUser).then(() => {
                    token = jwt.encode({ id: user.id }, jwtSecret);
                    done();
                });
            });
    });

    describe('Route GET /users', () => {
        it('Should return a list of Users', (done) => {
            request.get('/users').set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.body[0].id).to.be.eql(defaultUser.id);
                expect(res.body[0].name).to.be.eql(defaultUser.name);
                expect(res.body[0].email).to.be.eql(defaultUser.email);
                done(err);
            });
        });
    });

    describe('Route GET /users/{id}', () => {
        it('Should return a user', (done) => {
            request.get('/users/1').set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.body.id).to.be.eql(defaultUser.id);
                expect(res.body.name).to.be.eql(defaultUser.name);
                expect(res.body.email).to.be.eql(defaultUser.email);
                done(err);
            });
        });
    });

    describe('Route POST /users', () => {
        it('Should create a user', (done) => {
            const newUser = { id: 2, name: 'New Book', email: 'create@test.com', password: '123456' };

            request.post('/users').send(newUser).set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.body.id).to.be.eql(newUser.id);
                expect(res.body.name).to.be.eql(newUser.name);
                expect(res.body.email).to.be.eql(newUser.email);
                done(err);
            });
        });
    });

    describe('Route PUT /users/{id}', () => {
        it('Should updated a user', (done) => {
            const updatedUser = { id: 1, name: 'Updated User', email: 'updated@test.com', password: '123456' };

            request.put('/users/1').set('Authorization', `JWT ${token}`).send(updatedUser).end((err, res) => {
                expect(res.body).to.be.eql([1]);
                done(err);
            });
        });
    });

    describe('Route DELETE /users/{id}', () => {
        it('Should delete a user', (done) => {
            request.delete('/users/1').set('Authorization', `JWT ${token}`).end((err, res) => {
                expect(res.statusCode).to.be.eql(204);
                done(err);
            });
        });
    });
});
