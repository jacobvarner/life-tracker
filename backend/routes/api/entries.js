const Category = require('../../models/Category');
const Entry = require('../../models/Entry');

module.exports = app => {
  // Create a new entry
  app.post('/api/entry/new', (req, res) => {
    let { body } = req;
    let { title, description, value, date, categoryId } = body;

    if (!title) {
      title = 'No Title';
    }

    if (!description) {
      description = 'No Description';
    }

    if (!value) {
      res.send({
        success: false,
        message: 'Error: The entry must have a whole number value.'
      });
    } else {
      value = parseInt(value);
    }

    if (Object.prototype.toString.call(date) === '[object Date]') {
      if (isNaN(date.getTime())) {
        res.send({ success: false, message: 'Error: Date is invalid' });
      }
      res.send({ success: false, message: 'Error: Date is invalid.' });
    }

    Category.findById(categoryId, (err, category) => {
      if (err) {
        res.send({ success: false, message: 'Error: Server error.' });
      }
      if (!category) {
        res.send({
          success: false,
          message: 'Error: Could not find category.'
        });
      } else {
        Entry.find({ categoryId: categoryId, date: date }, (err, entry) => {
          if (err) {
            res.send({ success: false, message: 'Error: Server error.' });
          } else if (entry.length > 0) {
            res.send({
              success: false,
              message:
                'Error: There is already an entry in this category for this date.'
            });
          } else {
            const newEntry = new Entry();
            newEntry.title = title;
            newEntry.description = description;
            newEntry.date = date;
            newEntry.value = value;
            newEntry.categoryId = categoryId;
            newEntry.save((err, entry) => {
              if (err) {
                res.send({ success: false, message: 'Error: Server error.' });
              } else {
                res.send({
                  success: true,
                  message: 'New entry created.',
                  entry: entry
                });
              }
            });
          }
        });
      }
    });
  });

  app.get('/api/entry', (req, res) => {
    const { query } = req;
    const { start, end, id } = query;

    let startDate = new Date(start);
    let endDate = new Date(end);
    console.log('start: ' + startDate);
    console.log('end: ' + endDate);
  });
};
