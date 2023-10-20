const JobController = require('../controllers/job.controller');
const { authenticate } = require('../config/jwt.config');
const ApplicationController = require("../controllers/application.controller");

module.exports = (app) => {
    app.get("/api/jobs", JobController.getAllJobs);
    app.get("/api/jobs/:id", JobController.getOneJob);

    app.post("/api/company/jobs", authenticate, JobController.createJob);
    app.get("/api/company/jobs", authenticate, JobController.getCompanyJobs);
    app.get("/api/company/jobs/:id", authenticate, JobController.getCompanyJob);
    app.patch("/api/company/jobs/:id", authenticate, JobController.updateJob);
    app.delete("/api/company/jobs/:id", authenticate, JobController.deleteJob);
    app.get("/api/company/jobs/:id/applications/:applicationId", authenticate, JobController.getApplication);
}
