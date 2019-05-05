const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../bin/www');
const db = require('../../db');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTY5ODU0Mzd9.sY9cFOdYRL507wU1nRdMd1--GUWXZDO46vvVplKy1dI';

describe('Update product/update/:id', () => {
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

    it('Updates a product and returns it', async () => {
        const {body} = await request(app).put('/product/update/5ccdced103abd72e18eec083')
            .set('Authorization', `bearer ${token}`)
            .send({
                dataForUpdate: [
                    {
                        "key": "name",
                        "value": "Other Product"
                    },
                    {
                        "key": "reference",
                        "value": "AI165SASN"
                    }
                ]
            });

        const {data, error} = body;

        if (data !== undefined)
            expect(data).to.include.any.keys('_id', 'name', 'reference', 'category', 'dateCreate', 'dateUpdate');
        else
            expect(error).to.have.property('message', "Product doesn't exist!");
    })
});