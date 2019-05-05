const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../bin/www');
const db = require('../../db');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTY5ODU0Mzd9.sY9cFOdYRL507wU1nRdMd1--GUWXZDO46vvVplKy1dI';

describe('Add product/add', () => {
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

    it('Adds a product and returns it', async () => {

        const {body} = await request(app).post('/product/add')
            .set('Authorization', `bearer ${token}`)
            .send({
                name: "Node js",
                reference: "JFSSA56D22S",
                category: "5cc8dc3b1c9d4400000c4ff8"
            });

        const {data, error} = body;
        if (data !== undefined)
            expect(data).to.include.any.keys('_id', 'name', 'reference', 'category', 'dateCreate', 'dateUpdate');
        else
            expect(error).to.have.property('message', 'Product with this reference already exists');
    });
});