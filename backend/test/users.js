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

    it('Creates a new user without name fields complete', done => {
      const newUser2 = new User({
        email: 'test2@test.com',
        password: '123456789'
      });
      newUser2.save().then(() => {
        assert(!newUser2.isNew);
        done();
      });
    });

    it('Throws error for missing email', done => {
      const missingEmail = new User({
        firstName: 'Jacob',
        lastName: 'Varner',
        password: '123456789'
      });
      missingEmail.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing email.');
      });
    });

    it('Throws error for missing password', done => {
      const missingPassword = new User({
        firstName: 'Jacob',
        lastName: 'Varner',
        email: 'test3@test.com'
      });
      missingPassword.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing password.');
      });
    });

    it('Throws error for duplicate email', done => {
      const duplicateUser = new User({
        email: 'test2@test.com',
        password: '123456789'
      });
      duplicateUser.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for duplicate emails.');
      });
    });

    it('Throws error for invalid email', done => {
      const invalidEmail = new User({
        email: 'test2@2',
        password: '123456789'
      });
      invalidEmail.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for invalid emails.');
      });
    });
  });
});
