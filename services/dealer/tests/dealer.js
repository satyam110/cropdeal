const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkxNzEzNjIwZjIzMzg0Y2M4MTQ0ZiIsImVtYWlsIjoic2F0eWFtQHRlc3QuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA4MjA4NDAwLCJleHAiOjE2MDgyMTIwMDB9.Cp4MII-0Kr42QgzUOi3Lk6iNlnxrQBVmXZqjy1PnkpY"
chai.use(chaiHttp);

describe('Dealers API',() =>{
    describe('GET /dealer', ()=>{
    
        it('It should get all the dealers information', (done) => {
            chai.request('http://localhost:3002')
                .get('/dealer')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(203);
                    response.body.should.be.a('array');
                    response.body.length.should.be.gte(0);
                })
                done();
        })
        it('It should not return all the dealers information', (done) => {
            chai.request('http://localhost:3002')
                .get('/dealers')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                })
                done();
        })
    })

    describe('GET /dealer/profile/:id', ()=>{
        let id = '5fc9195e542a895e74ecd68f'
        it('It should get profile of a single user', (done) => {
            chai.request('http://localhost:3002')
                .get('/dealer/profile/'+id)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('Object');
                    response.body.should.have.property("name").eq("James");
                    response.body.should.have.property("email");
                    response.body.should.have.property("phone");
                    response.body.should.have.property("description");
                    response.body.bank_details.should.be.a('Object');
                    response.body.payment_details.should.be.a('Object');
                    response.body.should.have.property("role");
                })
                done();
        })

        it('It should return not found', (done) => {
            chai.request('http://localhost:3002')
                .get('/dealer/profile/5fd910a0438be938543db654') //invalid id
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"Cannot find profile with that ID"}')
                })
                done();
        })
    })

    describe('POST /dealer/signup',() => {
        xit('It should register dealer and save data to DB', (done) => {
            const dealer = {
                "name": "Satyam",
                "email": "satyam@test.com",
                "phone": 9983721134,
                "password": "satyam123",
                "description": "Hello, I'm Satyam"
            }
            chai.request('http://localhost:3002')
                .post('/dealer/signup')
                .send(dealer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object')
                })
            done();
        })
        it('It should not register dealer with same email ID', (done) => {
            const dealer = {
                "name": "James",
                "email": "james@test.com",
                "phone": 9983721134,
                "password": "james123",
                "description": "Hello, I'm James"
            }
            chai.request('http://localhost:3002')
                .post('/dealer/signup')
                .send(dealer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(422);
                })
            done();
        })
    })

    describe('PUT /dealer/:id',() => {
        it('It should update dealer profile', (done) => {
            let id = '5fc9195e542a895e74ecd68f'
            const dealer = {
                "phone": 9983721134,
                "description": "Hello, I'm James"
            }
            chai.request('http://localhost:3002')
                .put('/dealer/'+id)
                .send(dealer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("Update Successful")
                })
            done();
        })
    })
})
