const mongoose = require("mongoose");
const UsersSchema = mongoose.Schema({
  creation_Date: {
    type: Date,
    default: Date.now(),
  },
  creation_User: {
    type: String,
    required: true,
    trim: true,
  },
  modification_Date: {
    type: Date,
    default: Date.now(),
  },
  modification_User: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UsersSchema);
