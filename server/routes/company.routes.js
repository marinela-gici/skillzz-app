const CompanyController = require('../controllers/company.controller');

module.exports = (app) => {
    app.post("/api/register", CompanyController.register);
    app.post("/api/login", CompanyController.login);
    // app.post("/api/logout", CompanyController.logout);
}