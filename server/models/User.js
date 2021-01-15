const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  team: {
    type: String,
    enum: ["red", "yellow", "blue"],
},
  role: {
    type: String,
    enum: ["admin", "user"],
    default:"user",
},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
