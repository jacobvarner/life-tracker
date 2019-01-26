const chai = require('chai');
const chaiHttp = require('chai-http');
const Category = require('../models/Category');
const User = require('../models/User');
const Entry = require('../models/Entry');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('./test_helper');
let userId;
let categoryId;
let entryId;

describe('Entries', () => {
  before(done => {
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser2@test.com',
      password: '12345'
    });

    testUser.save((err, user) => {
      userId = user._id;

      const testCategory = new Category({
        name: 'Code',
        goal: 2,
        unit: 'Hours',
        userId: userId
      });

      testCategory.save((err, category) => {
        categoryId = category._id;

        let date = new Date();
        date = date.toLocaleDateString();
        date = new Date(date);

        const testEntry = new Entry({
          title: 'Test Title',
          description: 'Test description',
          value: 2,
          date: date,
          categoryId: categoryId
        });

        testEntry.save((err, entry) => {
          entryId = entry._id;
          done();
        });
      });
    });
  });

  describe('Creating a new entry in the database', () => {
    it('Creates a new entry with all fields complete', done => {
      const newEntry = new Entry({
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: new Date(new Date().toLocaleDateString()),
        categoryId: categoryId
      });

      newEntry.save().then(() => {
        assert(!newEntry.isNew);
        done();
      });
    });

    it('Creates a new entry with all required fields complete', done => {
      const newEntry2 = new Entry({
        value: 2,
        date: new Date(new Date().toLocaleDateString()),
        categoryId: categoryId
      });

      newEntry2.save().then(() => {
        assert(!newEntry2.isNew);
        done();
      });
    });

    it('Throws an error for missing value', done => {
      const missingValue = new Entry({
        title: 'Test Title',
        description: 'Test description',
        date: new Date(new Date().toLocaleDateString()),
        categoryId: categoryId
      });

      missingValue.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing value');
      });
    });

    it('Throws an error for missing date', done => {
      const missingDate = new Entry({
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        categoryId: categoryId
      });

      missingDate.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing date');
      });
    });

    it('Throws an error for missing category', done => {
      const missingCategory = new Entry({
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: new Date(new Date().toLocaleDateString())
      });

      missingCategory.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for missing category');
      });
    });

    it('Throws an error for invalid value', done => {
      const invalidValue = new Entry({
        title: 'Test Title',
        description: 'Test description',
        value: 'test',
        date: new Date(new Date().toLocaleDateString()),
        categoryId: categoryId
      });

      invalidValue.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for invalid value');
      });
    });

    it('Throws an error for invalid date', done => {
      const invalidDate = new Entry({
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: 'test',
        categoryId: categoryId
      });

      invalidDate.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error for invalid value');
      });
    });
  });
});
