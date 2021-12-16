const Schema = require("mongoose").Schema;
const uuid = require("node-uuid");

(exports.JobSchema = new Schema({
  id: {
    type: String,
    default: uuid.v1,
  },
  title: {
    type: String,
  },
  companyname: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  postdate: {
    type: Date,
    default: Date.now,
  },
  poster: {
    type: String,
  },
})),
  { collection: "job" };
