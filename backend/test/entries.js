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
let testDate;

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

        testDate = new Date(new Date().toLocaleDateString());

        const testEntry = new Entry({
          title: 'Test Title',
          description: 'Test description',
          value: 2,
          date: testDate,
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

  describe('Create a new entry through the API', () => {
    it('Creates an entry with all fields complete', done => {
      const body = {
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: new Date('2010-6-6'),
        categoryId: categoryId
      };

      chai
        .request(server)
        .post('/api/entry/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'New entry created.');
          done();
        });
    });

    it('Creates an entry with all required fields complete', done => {
      const body = {
        value: 2,
        date: new Date('2010-6-7'),
        categoryId: categoryId
      };

      chai
        .request(server)
        .post('/api/entry/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'New entry created.');
          assert.equal(body.entry.title, 'No Title');
          assert.equal(body.entry.description, 'No Description');
          done();
        });
    });
    it('Throws error for invalid value', done => {
      const body = {
        title: 'Test Title',
        description: 'Test description',
        value: 'test',
        date: new Date('2010-6-8'),
        categoryId: categoryId
      };

      chai
        .request(server)
        .post('/api/entry/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(
            body.message,
            'Error: The entry must have a whole, positive number value.'
          );
          done();
        });
    });

    it('Throws error for invalid date', done => {
      const body = {
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: 'test',
        categoryId: categoryId
      };

      chai
        .request(server)
        .post('/api/entry/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Server error.');
          done();
        });
    });

    it('Throws error for invalid category', done => {
      const body = {
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: new Date('2010-6-9'),
        categoryId: '5c4a4c7c30cbd465bcf5a600'
      };

      chai
        .request(server)
        .post('/api/entry/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, false);
          assert.equal(body.message, 'Error: Could not find category.');
          done();
        });
    });

    it('Updates an entry', done => {
      const body = {
        title: 'Test Title',
        description: 'Test description',
        value: 2,
        date: new Date('2010-6-6'),
        categoryId: categoryId
      };

      chai
        .request(server)
        .post('/api/entry/new')
        .send(body)
        .end((err, res) => {
          const { body } = res;
          assert.equal(body.success, true);
          assert.equal(body.message, 'Entry successfully updated.');
          done();
        });
    });
  });
});
