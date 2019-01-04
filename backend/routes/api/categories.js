const User = require('../../models/User');
const Category = require('../../models/Category');

module.export = app => {
  // Create a new category for a user
  app.post('/api/category/new', (req, res) => {
    const { body } = req;
    let { name, goal, unit, userId } = body;

    if (!name) {
      res.send({ success: false, message: 'Error: Name cannot be blank.' });
    } else if (!goal) {
      res.send({
        success: false,
        message: 'Error: Each category must have a goal.'
      });
    } else if (!unit) {
      res.send({
        success: false,
        message: 'Error: Each category must have a unit'
      });
    } else if (!userId) {
      res.send({
        success: false,
        message: 'Error: A user must be attached to each category.'
      });
    }

    name = name.trim();
    unit = unit.trim();

    try {
      goal = parseInt(goal);
    } catch (err) {
      res.send({
        success: false,
        message: 'Error: The goal must be a whole number.'
      });
    }

    User.findById(userId, (err, foundUser) => {
      if (err) {
        res.send({ success: false, message: 'Error: Server error.' });
      }
      if (!foundUser) {
        res.send({
          success: false,
          message: 'Error: Could not find this user.'
        });
      } else {
        Category.find({ name: name }, (err, foundCategory) => {
          if (err) {
            res.send({ success: false, message: 'Error: Server error.' });
          } else if (foundCategory.length > 0) {
            res.send({
              success: false,
              message: 'Error: That category already exists for that user.'
            });
          } else {
            const newCategory = new Category();
            newCategory.name = name;
            newCategory.goal = goal;
            newCategory.unit = unit;
            newCategory.userId = userId;
            newCategory.save((err, category) => {
              if (err) {
                res.send({ success: false, message: 'Error: Server error' });
              } else {
                res.send({ success: true, message: 'New category created.' });
              }
            });
          }
        });
      }
    });
  });
};