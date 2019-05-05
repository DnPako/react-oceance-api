const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../bin/www');
const db = require('../../db');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTY5ODU0Mzd9.sY9cFOdYRL507wU1nRdMd1--GUWXZDO46vvVplKy1dI';

describe('Delete product', () => {
    before((done) => {
        db.connect()
            .then(() => done())
            .catch((error) => done(error));
    });

    after(done => {
        db.close()
            .then(() => done())
            .catch((error) => done(error))
    });

    it('Delete /delete/:id', async () => {
        const {body} = await request(app).del('/product/delete/5ccdced103abd72e18eec080')
            .set('Authorization', `bearer ${token}`);

        const {error} = body;

        if (error === undefined)
            expect(body).to.have.property('message', "Product deleted successfully!");
        else
            expect(error).to.have.property('message', "Product doesn't exist!");
    });
});

