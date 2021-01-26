import chai = require('chai')
import chaiHttp = require('chai-http')

const expect = require('chai').expect;
chai.use(chaiHttp);

const url = 'http://localhost:3200';

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
        console.log(url)
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
