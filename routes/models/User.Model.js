const mongoose = require("mongoose");
const UserSchema = require("../schema/User.Schema").UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
  return UserModel.create(user);
}

function getAllUsers() {
  return UserModel.find().exec();
}

function deleteUserByName(username) {
  return UserModel.deleteOne({ username: username }).exec();
}

function blurFind(username) {
  const reg = new RegExp(username, "i");
  return UserModel.find({
    username: { $regex: reg },
  }).exec();
}

function findUserByUsername(username) {
  return UserModel.findOne({ username }).exec();
  // { username: username }
}

// Make sure to export a function after you create it!
module.exports = {
  insertUser,
  getAllUsers,
  findUserByUsername,
  deleteUserByName,
  blurFind,
};
