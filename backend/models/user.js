const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Users
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

UserSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.password);
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('User', UserSchema);
