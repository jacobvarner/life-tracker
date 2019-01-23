const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/User');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('./test_helper');

describe('Users', () => {
  describe('Creating a new user in the database', () => {
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

  describe('Creating a new user through the API', () => {
    it('Sign up a new user with all fields complete', done => {
      const body = {
        firstName: 'Jacob',
        lastName: 'Varner',
        email: 'test4@test.com',
        password: '123456',
        confirmPassword: '123456'
      };

      chai
        .request(server)
        .post('/api/account/signup')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'Sign up successful!');
          done();
        });
    });

    it('Sign up a new user with all fields complete except names', done => {
      const body = {
        email: 'test5@test.com',
        password: '123456',
        confirmPassword: '123456'
      };

      chai
        .request(server)
        .post('/api/account/signup')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'Sign up successful!');
          done();
        });
    });

    it('Throws error for signing up a user with a duplicate email', done => {
      const body = {
        email: 'test4@test.com',
        password: '123456',
        confirmPassword: '123456'
      };

      chai
        .request(server)
        .post('/api/account/signup')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(
            body.message,
            'Error: An account with this email address already exist.'
          );
          done();
        });
    });

    it('Throws error for signing up a user with mismatched passwords', done => {
      const body = {
        email: 'test6@test.com',
        password: '123456',
        confirmPassword: '12345'
      };

      chai
        .request(server)
        .post('/api/account/signup')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Passwords do not match.');
          done();
        });
    });

    it('Throws error for signing up a user with no password', done => {
      const body = {
        email: 'test7@test.com'
      };

      chai
        .request(server)
        .post('/api/account/signup')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Password cannot be blank.');
          done();
        });
    });

    it('Throws error for signing up a user with no email', done => {
      const body = {
        firstName: 'Jacob',
        lastName: 'Varner',
        password: '123456',
        confirmPassword: '123456'
      };

      chai
        .request(server)
        .post('/api/account/signup')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Email cannot be blank.');
          done();
        });
    });
  });

  describe('Sign in a user through the API', () => {
    it('Sign in a current user', done => {
      const body = {
        email: 'test4@test.com',
        password: '123456'
      };

      chai
        .request(server)
        .post('/api/account/signin')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'Valid sign in');
          done();
        });
    });

    it('Sign in a current user at the same time as a user already logged in', done => {
      const body = {
        email: 'test4@test.com',
        password: '123456'
      };

      chai
        .request(server)
        .post('/api/account/signin')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'Valid sign in');
          done();
        });
    });

    it('Sign in with wrong password', done => {
      const body = {
        email: 'test4@test.com',
        password: '1234567'
      };

      chai
        .request(server)
        .post('/api/account/signin')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Incorrect password');
          done();
        });
    });

    it('Sign in with wrong email', done => {
      const body = {
        email: 'wrong@test.com',
        password: '1234567'
      };

      chai
        .request(server)
        .post('/api/account/signin')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(
            body.message,
            'Error: No user found with that email address'
          );
          done();
        });
    });

    it('Sign in with no email', done => {
      const body = {
        password: '1234567'
      };

      chai
        .request(server)
        .post('/api/account/signin')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Email cannot be blank');
          done();
        });
    });

    it('Sign in with no password', done => {
      const body = {
        email: 'wrong@test.com'
      };

      chai
        .request(server)
        .post('/api/account/signin')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Password cannot be blank');
          done();
        });
    });
  });
});
