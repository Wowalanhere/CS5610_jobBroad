const response = require("express");
const express = require("express");
const router = express.Router();
const JobModel = require("./models/Job.Model");

router.get("/findAll", function (request, response) {
  return JobModel.findAllJobs()
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.delete("/title/:title", function (request, response) {
  const jobTitle = request.params.title;
  return JobModel.deleteJobByTitle(jobTitle)
    .then((Jobresponse) => response.status(200).send("Successful!"))
    .catch((error) => response.status(400).send(error));
});

router.delete("/deleteid/:id", function (request, response) {
  const id = request.params.id;
  return JobModel.deleteJobById(id)
    .then((Jobresponse) => response.status(200).send("Successful!"))
    .catch((error) => response.status(400).send(error));
});

router.get("/blur/:title", function (request, response) {
  const jobTitle = request.params.title;
  return JobModel.findJobsByBlurTitle(jobTitle)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/id/:id", function (request, response) {
  const jobId = request.params.id;
  return JobModel.findJobById(jobId)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.post("/create", function (request, response) {
  const job = request.body;
  return JobModel.insertJob(job)
    .then((jobResponse) => response.status(200).send(job.title))
    .catch((error) => response.status(400).send(error));
});

router.post("/update/:query", function (request, response) {
  const query = request.params.query;
  const job = request.body;
  return JobModel.upgradeJob(query, job)
    .then((jobResponse) => response.status(200).send(job.title))
    .catch((error) => response.status(400).send(error));
});

module.exports = router;
