const Schema = require("mongoose").Schema;
const uuid = require("node-uuid");

exports.FavouriteSchema = new Schema({
  id: {
    type: String,
    default: uuid.v1,
  },
  username: {
    type: String,
  },
  jobid: {
    type: String,
  },
});
