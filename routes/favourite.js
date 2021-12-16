const express = require("express");
const router = express.Router();
const FavouriteModel = require("./models/Favourite.Model");

router.post("/create", function (request, response) {
  const favourite = request.body;
  console.log(favourite);
  return FavouriteModel.insertFavourite(favourite)
    .then((favouriteResponse) => response.status(200).send(favouriteResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/jobid/:jobid", function (request, response) {
  const jobid = request.params.jobid;
  return FavouriteModel.findFavouriteByJobId(jobid)
    .then((favouriteResponse) => response.status(200).send(favouriteResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/username/:username", function (request, response) {
  const username = request.params.username;
  return FavouriteModel.findFavouriteByUser(username)
    .then((favouriteResponse) => response.status(200).send(favouriteResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/jobanduser/:username/:jobid", function (request, response) {
  const username = request.params.username;
  const jobid = request.params.jobid;
  return FavouriteModel.findFavouriteByJobUser(username, jobid)
    .then((favouriteResponse) => response.status(200).send(favouriteResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/id/:id", function (request, response) {
  const id = request.params.id;
  return FavouriteModel.findFavouriteById(id)
    .then((favouriteResponse) => response.status(200).send(favouriteResponse))
    .catch((error) => response.status(400).send(error));
});

router.delete("/remove/:username/:jobid", function (request, response) {
  const username = request.params.username;
  const jobid = request.params.jobid;
  return FavouriteModel.deleteFavouriteByJobUser(username, jobid)
    .then((favouriteResponse) => response.status(200).send(favouriteResponse))
    .catch((error) => response.status(400).send(error));
});

module.exports = router;
