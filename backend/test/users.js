const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/User');
const should = chai.should();
chai.use(chaiHttp);
const assert = chai.assert;

describe('Users', () => {
  describe('Creating a new user', () => {
    it('Creates a new user with all fields complete', done => {
      const newUser = new User({
        firstName: 'Jacob',
        lastName: 'Varner',
        email: 'test@test.com',
        password: '123456789'
      });
      newUser.save().then(() => {
        assert(!newUser.isNew);
        done();
      });
    });
  });
});
