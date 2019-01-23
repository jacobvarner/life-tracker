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
});
