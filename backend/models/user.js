const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Users
const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    password: { type: String, default: '' },
    isDeleted: {
      type: Boolean,
      default: false
    },
    signUpDate: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('User', UserSchema);
