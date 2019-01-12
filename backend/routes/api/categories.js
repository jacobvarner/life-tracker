const User = require('../../models/User');
const Category = require('../../models/Category');

module.exports = app => {
  // Create a new category for a user
  app.post('/api/category/new', (req, res) => {
    const { body } = req;
    let { name, goal, unit, userId } = body;

    if (!name) {
      return res.send({
        success: false,
        message: 'Error: Name cannot be blank.'
      });
    } else if (!goal) {
      return res.send({
        success: false,
        message: 'Error: Each category must have a goal.'
      });
    } else if (!unit) {
      return res.send({
        success: false,
        message: 'Error: Each category must have a unit'
      });
    } else if (!userId) {
      return res.send({
        success: false,
        message: 'Error: A user must be attached to each category.'
      });
    }

    name = name.trim();
    unit = unit.trim();

    try {
      goal = parseInt(goal);
    } catch (err) {
      return res.send({
        success: false,
        message: 'Error: The goal must be a whole number.'
      });
    }

    User.findById(userId, (err, foundUser) => {
      if (err) {
        return res.send({ success: false, message: 'Error: Server error.' });
      }
      if (!foundUser) {
        return res.send({
          success: false,
          message: 'Error: Could not find this user.'
        });
      } else {
        Category.find({ name: name }, (err, foundCategory) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error.'
            });
          } else if (foundCategory.length > 0) {
            return res.send({
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
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              } else {
                return res.send({
                  success: true,
                  message: 'New category created.'
                });
              }
            });
          }
        });
      }
    });
  });

  // Gets categories for a user
  app.get('/api/category', (req, res) => {
    const { query } = req;
    const { userId, archived } = query;
    if (archived) {
      Category.find(
        { userId: userId, archived: archived },
        null,
        { sort: { archived: 1, name: 1 } },
        (err, categories) => {
          if (err) {
            return res.send({ success: false, message: 'Error: Server error' });
          }
          if (!categories.length > 0) {
            return res.send({
              success: false,
              message: 'Error: No categories found for this user.'
            });
          } else {
            return res.send({
              success: true,
              message: categories.length + ' categories found!',
              categories: categories
            });
          }
        }
      );
    } else {
      Category.find(
        { userId: userId },
        null,
        { sort: { archived: 1, name: 1 } },
        (err, categories) => {
          if (err) {
            return res.send({ success: false, message: 'Error: Server error' });
          }
          if (!categories.length > 0) {
            return res.send({
              success: false,
              message: 'Error: No categories found for this user.'
            });
          } else {
            return res.send({
              success: true,
              message: categories.length + ' categories found!',
              categories: categories
            });
          }
        }
      );
    }
  });
};
