const jwt = require("jsonwebtoken");
const Company = require("../models/company.model");

require("dotenv").config();

module.exports.authenticate = (req, res, next) => {

    try {
        const token = req.cookies?.companytoken;
        console.log(token)
        if (!token) {
            console.log('tes')
            return res.status(401).json();
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
            if (err) {
                return res.status(401).json();
            } else {
                const company = await Company.findOne({_id: payload.id})
                if (!company) {
                    return res.status(401).json();
                }

                req.user = company;
                next();
            }
        });
    } catch (e) {
        return res.status(401).json();
    }
};
