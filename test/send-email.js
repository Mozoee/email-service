const express = require('express');
const chai = require('chai')
const expect = chai.expect;
const bodyParser = require('body-parser');
const emailRouter = require('../controllers/email');
const sinon = require('sinon');
const supertest = require('supertest');
const rp = require('request-promise');

const VALID_REQUEST_BODY = {
    "from" : {
        "email": "test@hotmail.com",
        "name" : "Mr. ABC"
    },
    "to" : [{
        "email": "test@gmail.com",
        "name" : "MR. XYZ"
    }
    ],
    "subject": "Test email",
    "message": "Heya! test time."

};

const INVALID_REQUEST_BODIES = [{
    "from" : {
        "name" : "MR. ABC"
    },
    "to" : [{
        "email": "test@gmail.com",
        "name" : "MR XYZ"
    }
    ],
    "subject": "Test email",
    "message": "Heya! test time."

},
{
    "from" : {
    "email" : "test@hotmail.com",
    "name" : "Michael"
    },
    "subject": "Test email",
    "message": "Heya! test time."
}];

const VALID_OUTPUT = 'Email sent';


function setupApp() {
    const app = express();
    app.use(bodyParser.json());
    app.use('/email', emailRouter);
    return supertest.agent(app);
}
function test(context, body) {

    context.sandbox.resetHistory();
    console.log('body: ', body);
    const c = context;
    return context.agent.post('/')
      .send(body)
      .then((r) => {
        c.response = r;
      }).catch((err) => {
        throw new Error(err);
      });
  }
  
describe('POST /email', function() {
    const c = {};

    before(() => {
      c.sandbox = sinon.createSandbox();

      c.stubs = {
        rp: c.sandbox.stub(rp, 'post').returns(Promise.resolve(VALID_OUTPUT)),
      };
    });

    after(() => {
      c.sandbox.restore();
    });


  describe('When the service is called', function() {
    
    describe('when the request body is invalid', () => {
        before(() => c.agent = setupApp());
    
        INVALID_REQUEST_BODIES.forEach((body) => {
          describe(JSON.stringify(body), () => {
            before(() => test(c, body));
            it('the response statusCode should be 404', () => expect(c.response.statusCode).to.equal(404));
          });
        });
    
    
      });

    });
});