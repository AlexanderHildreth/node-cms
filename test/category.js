// Modules
const chai          = require('chai');
const chaiHttp      = require('chai-http');
const mongoose      = require('mongoose')
const app           = require('../app');
const should        = chai.should();
// Models
const Category      = require('../models/Category')
// config
const mongoDbUrl    = process.env.MONGODB_URI || 'mongodb://localhost:27017/cms';

chai.use(chaiHttp);

// parent block
describe('Categories', () => {
    //  DB stuff
    before(function () {
        mongoose.Connection(mongoDbUrl.url, { useNewUrlParser: true, useUnifiedTopology: true });
    });
    beforeEach((done) => {
        Category.deleteMany({}, (err) => {
            done();
        })
    })
    after(function () {
        mongoose.connection.close();
    });

    // get
    describe('/GET category', () => {
        it('it should GET all the categories', (done) => {
            chai.request(app).get('/admin/categories').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });
})