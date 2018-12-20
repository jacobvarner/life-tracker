const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Categories - Linked to User by userId
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    goal: { type: Number, required: true },
    unit: { type: String, required: true },
    userId: { type: ObjectId, required: true }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Category', CategorySchema);
