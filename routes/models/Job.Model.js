const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function findAllJobs() {
  return JobModel.find().exec();
}

function findJobsByBlurTitle(title) {
  const reg = new RegExp(title, "i");
  return JobModel.find({ title: { $regex: reg } }).exec();
}

function findJobByTitle(title) {
  return JobModel.find({ title: title }).exec();
}

function findJobById(id) {
  return JobModel.find({ id: id }).exec();
}

function findJobsByPoster(poster) {
  return JobModel.find({ poster: poster }).exec();
}

function upgradeJob(jobid, job) {
  const query = { id: jobid };
  return JobModel.updateOne(query, job);
}

function deleteJobByTitle(title) {
  return JobModel.deleteOne({ title: title });
}

function deleteJobById(id) {
  return JobModel.deleteOne({ id: id });
}

module.exports = {
  insertJob,
  findAllJobs,
  findJobByTitle,
  findJobById,
  findJobsByBlurTitle,
  findJobsByPoster,
  upgradeJob,
  deleteJobByTitle,
  deleteJobById,
};
