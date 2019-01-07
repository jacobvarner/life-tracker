const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entries - Linked to Category by categoryId
const EntrySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    value: { type: Number, required: true },
    date: { type: Date, required: true },
    categoryId: { type: String, required: true }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Entry', EntrySchema);
