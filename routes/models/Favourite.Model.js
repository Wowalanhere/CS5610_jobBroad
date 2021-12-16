const mongoose = require("mongoose");
const FavouriteSchema = require("../schema/Favourite.Schema").FavouriteSchema;

const FavouriteModel = mongoose.model("Favourite", FavouriteSchema);

function insertFavourite(favourite) {
  return FavouriteModel.create(favourite);
}

function findFavouriteByJobId(jobid) {
  return FavouriteModel.find({ jobid: jobid }).exec();
}

function findFavouriteByUser(username) {
  return FavouriteModel.find({ username: username }).exec();
}

function findFavouriteById(id) {
  return FavouriteModel.find({ id: id }).exec();
}

function findFavouriteByJobUser(username, jobid) {
  return FavouriteModel.find({ username: username, jobid: jobid }).exec();
}

function deleteFavouriteByJobUser(username, jobid) {
  return FavouriteModel.deleteOne({ username: username, jobid: jobid }).exec();
}

module.exports = {
  insertFavourite,
  findFavouriteById,
  findFavouriteByUser,
  findFavouriteByJobId,
  deleteFavouriteByJobUser,
  findFavouriteByJobUser,
};
