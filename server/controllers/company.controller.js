const Company = require("../models/company.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Job = require("../models/job.model");

const getToken = (company) => {
    const payload = {
        id: company._id,
    };

    return jwt.sign(payload, process.env.SECRET_KEY);
};

module.exports = {
    register: (req, res) => {
        Company.exists({email: req.body.email})
            .then((companyExists) => {
                if (companyExists) {
                    return Promise.reject({
                        errors: {email: {message: "Email exists"}},
                    });
                }
                return Company.create(req.body)
                    .then((company) => {
                        res
                            .cookie("companytoken", getToken(company), {
                                httpOnly: true,
                            })
                            .json({msg: "success!", company: company});
                    })
                    .catch((err) => Promise.reject(err));
            })
            .then((company) => res.json(company))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    login: async (req, res) => {
        const company = await Company.findOne({email: req.body.email});

        if (company === null) {
            return res.json({error: 'Enter a valid email and password'}, 400);
        }
        const correctPassword = await bcrypt.compare(
            req.body.password,
            company.password
        );

        if (!correctPassword) {
            return res.json({error: 'Enter a valid email and password'}, 400);
        }

        res
            .cookie("companytoken", getToken(company), {
                httpOnly: true,
            })
            .json({msg: "success!"});
    },

    logout: (req, res) => {
        res.clearCookie("companytoken");
        res.sendStatus(200);
    },

    getOneCompany: (request, response) => {
        Company.findOne({_id: request.user._id})
            .then((company) => {
                console.log(company);
                response.json(company);
            })
            .catch((err) => {
                console.log(err);
                response.json(err);
            });
    },

    updateOneCompany: (request, response) => {
        Company.findOneAndUpdate({_id: request.user._id}, request.body, {
            new: true, runValidators: true
        })
            .then((updated) => response.json(updated))
            .catch((err) => response.status(400).json(err));
    },

    updatePassword: (request, response) => {
        Company.findOne({_id: request.user._id})
            .then(async (company) => {
                const correctPassword = await bcrypt.compare(
                    request.body.password,
                    company.password
                );

                if (!correctPassword) {
                    // return response.status(400).json({errors: {password: {message: 'Password is incorrect'}}});
                }

                company.newPassword = request.body.newPassword;
                company.confirmNewPassword = request.body.confirmNewPassword;
                company.validate();



                Company.findOneAndUpdate({_id: company._id}, request.body, {
                    new: true, runValidators: true
                })
                    .then((updated) => response.json(updated))
                    .catch((err) => response.status(400).json(err));
            })
            .catch((err) => {
                console.log(err);
                response.json(err);
            });
    },



};