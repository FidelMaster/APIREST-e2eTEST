import chai = require('chai')
import chaiHttp = require('chai-http')
import supertest = require('supertest');
import app = require('../../start');
const expect = require('chai').expect;
chai.use(chaiHttp);

const url = 'http://localhost:' + process.env.PORT;

// send requesti without authToken
describe('Verify Routes Protected', () => {
    it('/AllPosts is protect', (done) => {
        chai.request(url)
            .get('/AllPosts')
            .end(function (err, res) {
                expect(res).to.have.status(401);
            });
    });

    it('/UserPosts is protect', () => {
             chai.request(url)
            .get('/UserPosts')
            .end(function (err, res) {
             expect(res).to.have.status(401);
            });
    });

    it('/CreatePost is protect', () => {
            chai.request(url)
            .post('/CreatePost')
            .end(function (err, res) {
             expect(res).to.have.status(401);
            });
    });

    it('/DeletePost is protect', () => {
            chai.request(url)
            .delete('/DeletePost')
            .end(function (err, res) {
                expect(res).to.have.status(401);
            });
    });


});
