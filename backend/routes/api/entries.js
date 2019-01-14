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

    value = parseInt(value);

    if (!value) {
      return res.send({
        success: false,
        message: 'Error: The entry must have a whole, positive number value.'
      });
    }

    if (Object.prototype.toString.call(date) === '[object Date]') {
      if (isNaN(date.getTime())) {
        return res.send({ success: false, message: 'Error: Date is invalid' });
      }
      return res.send({ success: false, message: 'Error: Date is invalid.' });
    }

    Category.findById(categoryId, (err, category) => {
      if (err) {
        return res.send({ success: false, message: 'Error: Server error.' });
      }
      if (!category) {
        return res.send({
          success: false,
          message: 'Error: Could not find category.'
        });
      } else {
        Entry.find({ categoryId: categoryId, date: date }, (err, entry) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error.'
            });
          } else if (entry.length > 0) {
            Entry.findByIdAndUpdate(
              entry[0]._id,
              { title: title, description: description, value: value },
              (err, updatedEntry) => {
                if (err) {
                  return res.send({
                    success: false,
                    message: 'Error: Server error'
                  });
                } else {
                  console.log('Editing entry ' + entry[0]._id);
                  return res.send({
                    success: true,
                    message: 'Entry successfully updated.',
                    entry: updatedEntry
                  });
                }
              }
            );
          } else {
            console.log('Creating new entry!');
            const newEntry = new Entry();
            newEntry.title = title;
            newEntry.description = description;
            newEntry.date = date;
            newEntry.value = value;
            newEntry.categoryId = categoryId;
            newEntry.save((err, entry) => {
              if (err) {
                return res.send({
                  success: false,
                  message: 'Error: Server error.'
                });
              } else {
                return res.send({
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

    Entry.find(
      {
        categoryId: id,
        date: { $gte: startDate, $lte: endDate }
      },
      null,
      { sort: { date: 1 } },
      (err, entries) => {
        if (err) {
          return res.send({ success: false, message: 'Error: Server error.' });
        }

        if (!entries.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Did not find any entries.'
          });
        } else if (entries.length > 7) {
          return res.send({
            success: false,
            message: 'Error: Found too many entries.'
          });
        } else {
          return res.send({
            success: true,
            message: 'Here are the found entries for this week!',
            entries: entries
          });
        }
      }
    );
  });

  app.delete('/api/entry/delete', (req, res) => {
    const { body } = req;
    const { id } = body;
    Entry.findByIdAndDelete(id, err => {
      if (err) {
        return res.send({ success: false, message: 'Error: Server error.' });
      } else {
        return res.send({
          success: true,
          message: 'Entry ' + id + ' deleted!'
        });
      }
    });
  });
};
