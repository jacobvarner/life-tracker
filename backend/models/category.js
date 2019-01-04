const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Categories - Linked to User by userId
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    goal: { type: Number, required: true },
    unit: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, default: 'active' }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Category', CategorySchema);
