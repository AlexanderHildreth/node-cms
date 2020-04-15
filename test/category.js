// Modules
const chai          = require('chai');
const chaiHttp      = require('chai-http');
// const mongoose      = require('mongoose')
const app           = require('../app');
// Models
const Category      = require('../models/Category')
// config
const mongoDbUrl    = process.env.MONGODB_URI || 'mongodb://localhost:27017/cms';
// const vars 
const expect        = chai.expect;
const should        = chai.should();

chai.use(chaiHttp);

// parent block
describe('Categories', () => {
    /*
    * DB STUFF
    */
    beforeEach((done) => {
        Category.deleteMany({}, (err) => {
            if (err) done(err);

            done();
        })
    })
    /*
    * GET
    */
    describe('/GET categories', () => {
        it('it should GET all the categories', done => {
            chai.request(app)
                .get('/admin/categories')
                .end((err, res) => {
                    expect(err).to.be.null;;

                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
    * POST
    */
    describe('/POST categories', () => {
        it('it should not POST a category without name field', (done) => {
            const categoryPostFail = {
                name: undefined
            }

            chai.request(app)
                .post('/admin/categories/create')
                .set('Content-Type', 'application/json')
                .send(categoryPostFail)
                .end((err, res) => {
                    expect(err).to.be.null;

                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('type').eql('required');
                    // console.log(res.body.errors)
                    done()
                })
        })
        
        it('it should POST a category', (done) => {
            const categoryPostSuccess = new Category({
                name: "MOCHA TEST CREATE CATEGORY"
            })

            chai.request(app)
                .post('/admin/categories/create')
                .set('content-type', 'application/json')
                .send({ 
                    name: "MOCHA TEST CREATE CATEGORY" 
                })
                .end((err, res) => {
                    expect(err).to.be.null;

                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    console.log()
                    res.body.should.have.property('message').eql(`Category successfully created: "${categoryPostSuccess.name}"`);
                    res.body.category.should.have.property('name');
                    done()
                })
        })
    })
})