const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const username = req.session.username;
  if (!username) {
    res.status(401).send("Unauthorized: No session available");
  } else {
    req.username = username;
    next();
  }
};
