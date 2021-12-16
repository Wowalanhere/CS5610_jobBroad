const express = require("express");
const { response } = require("express");
const UserModel = require("./models/User.Model");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth_middleware = require("./auth_middleware.js");

router.get("/findAll", function (request, response) {
  UserModel.getAllUsers()
    .then((userRsponse) => {
      return response.status(200).send(userRsponse);
    })
    .catch((error) => response.status(400).send(error));
});

router.post("/", function (req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res
      .status(422)
      .send("Missing username: " + username + "or password:" + password);
  }
  return UserModel.insertUser({ username: username, password: password })
    .then((userResponse) => {
      req.session.username = username;
      return res.status(200).send({ username });
    })
    .catch((error) => res.status(422).send(error));
});

router.post("/authenticate", function (request, response) {
  let { username, password } = request.body;
  console.log(request.body);
  // password = password && JSON.stringify(password);
  if (!password || !username) {
    response.status(400).send("Missing username or password");
  }
  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        console.log("here");
        return response.status(404).send("No user found with that username!");
      }
      if (userResponse.password === password) {
        request.session.username = username;
        return response.status(200).send({ username });
      } else {
        return response.status(404).send("Wrong password!");
      }
    })
    .catch((error) => console.error(error));
});

router.get("/whoisloggedin", auth_middleware, function (request, response) {
  const username = request.username;
  return response.status(200).send(username);
});

router.post("/logout", function (request, response) {
  request.session.destroy();
  return response.send("OK");
});

router.delete("/deleteone/:username", function (request, response) {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing username");
  }

  return UserModel.deleteUserByName(username)
    .then(() => {
      return response.status(200).send("Successful!");
    })
    .catch((error) => response.status(400).send("Delete Failed"));
});

module.exports = router;
