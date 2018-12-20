const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Entries - Linked to Category by categoryId
const EntrySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    value: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    categoryId: { type: ObjectId, required: true }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Entry', EntrySchema);
