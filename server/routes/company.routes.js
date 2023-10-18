const CompanyController = require('../controllers/company.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/register", CompanyController.register);
    app.post("/api/login", CompanyController.login);
    app.post("/api/logout", CompanyController.logout);
    app.get("/api/dashboard/profile", authenticate, CompanyController.getOneCompany);
    app.patch("/api/dashboard/profile", authenticate, CompanyController.updateOneCompany);
    app.post("/api/dashboard/profile/change-password", authenticate, CompanyController.updatePassword);
}