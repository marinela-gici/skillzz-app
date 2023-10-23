const ApplicationController = require('../controllers/application.controller');
const JobController = require("../controllers/job.controller");

module.exports = (app) => {
    app.post("/api/applications", ApplicationController.createApplication);
}