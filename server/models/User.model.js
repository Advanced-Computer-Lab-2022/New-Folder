const mongoose = require("mongoose");

//email password gender firstName lastName image country courses isCorporate
const User = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
