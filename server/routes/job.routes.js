const JobController = require('../controllers/job.controller');
const { authenticate } = require('../config/jwt.config');
const ApplicationController = require("../controllers/application.controller");

module.exports = (app) => {
    app.post("/api/jobs", JobController.createJob);
    app.get("/api/jobs", JobController.getAllJobs);
    app.get("/api/jobs/:id", JobController.getOneJob);
}