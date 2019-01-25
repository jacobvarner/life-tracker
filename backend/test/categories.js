const chai = require('chai');
const chaiHttp = require('chai-http');
const Category = require('../models/Category');
const User = require('../models/User');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('./test_helper');
let userId;

describe('Categories', () => {
  before(done => {
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      password: '12345'
    });

    testUser.save((err, user) => {
      userId = user._id;
      done();
    });
  });

  describe('Creating a new category in the database', () => {
    it('Creates a new category with all fields complete', done => {
      const newCategory = new Category({
        name: 'Test',
        goal: 3,
        unit: 'Tests',
        userId: userId
      });

      newCategory.save().then(() => {
        assert(!newCategory.isNew);
        done();
      });
    });

    it('Should throw error for missing name', done => {
      const newCategory = new Category({
        goal: 3,
        unit: 'Tests',
        userId: userId
      });

      newCategory.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing name');
      });
    });

    it('Should throw error for missing goal', done => {
      const newCategory = new Category({
        name: 'Test2',
        unit: 'Tests',
        userId: userId
      });

      newCategory.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing goal');
      });
    });

    it('Should throw error for invalid goal', done => {
      const newCategory = new Category({
        name: 'Test3',
        goal: 'test',
        unit: 'Tests',
        userId: userId
      });

      newCategory.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for invalid goal');
      });
    });

    it('Should throw error for missing unit', done => {
      const newCategory = new Category({
        name: 'Test4',
        goal: 3,
        userId: userId
      });

      newCategory.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing unit');
      });
    });

    it('Should throw error for missing userId', done => {
      const newCategory = new Category({
        name: 'Test4',
        goal: 3,
        unit: 'Tests'
      });

      newCategory.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing userId');
      });
    });
  });

  describe('Creating a new category through the API', () => {
    it('Create a new category with all fields complete', done => {
      const body = {
        name: 'New Category',
        goal: 3,
        unit: 'Test',
        userId: userId
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'New category created.');
          done();
        });
    });

    it('Throws error for name field being blank', done => {
      const body = {
        name: '',
        goal: 3,
        unit: 'Test',
        userId: userId
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Name cannot be blank.');
          done();
        });
    });

    it('Throws error for goal field being blank', done => {
      const body = {
        name: 'New Category 2',
        goal: 0,
        unit: 'Test',
        userId: userId
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Each category must have a goal.');
          done();
        });
    });

    it('Throws error for unit field being blank', done => {
      const body = {
        name: 'New Category 3',
        goal: 3,
        unit: '',
        userId: userId
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Each category must have a unit.');
          done();
        });
    });

    it('Throws error for userId field being blank', done => {
      const body = {
        name: 'New Category 4',
        goal: 3,
        unit: 'Test',
        userId: ''
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(
            body.message,
            'Error: A user must be attached to each category.'
          );
          done();
        });
    });

    it('Throws error for goal not being a whole number', done => {
      const body = {
        name: 'New Category 5',
        goal: 'test',
        unit: 'Test',
        userId: userId
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: The goal must be a whole number.');
          done();
        });
    });

    it('Throws error for a user that does not exist', done => {
      const body = {
        name: 'New Category 6',
        goal: 3,
        unit: 'Test',
        userId: '5c4a4c7c30cbd465bcf5a600'
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Could not find this user.');
          done();
        });
    });

    it('Throws error for a duplicate category', done => {
      const body = {
        name: 'New Category',
        goal: 3,
        unit: 'Test',
        userId: userId
      };

      chai
        .request(server)
        .post('/api/category/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(
            body.message,
            'Error: That category already exists for that user.'
          );
          done();
        });
    });
  });

  describe('Get categories from the API', () => {
    it('Gets all unarchived categories for a valid user', done => {
      chai
        .request(server)
        .get('/api/category?userId=' + userId + '&archived=false')
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.exists(body.categories);
          done();
        });
    });

    it('Gets all categories for a valid user', done => {
      chai
        .request(server)
        .get('/api/category?userId=' + userId)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.exists(body.categories);
          done();
        });
    });

    it('Should return error for no categories found for a user that does not exist', done => {
      chai
        .request(server)
        .get('/api/category?userId=5c4a4c7c30cbd465bcf5a600')
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(
            body.message,
            'Error: No categories found for this user.'
          );
          done();
        });
    });
  });
});
