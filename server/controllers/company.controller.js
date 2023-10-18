const Company = require("../models/company.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Job = require("../models/job.model");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const getToken = (company) => {
    const payload = {
        id: company._id,
    };

    return jwt.sign(payload, process.env.SECRET_KEY);
};

const uploadImage = (base64) => {
    const base64RegExp = /data:image\/[^;]+;base64[^"]+/i;
    const isBase64 = (str) => base64RegExp.test(str);

    if (isBase64(base64)) {
        const filename = uploadLocalFile(base64);
        console.log(filename);
        return filename;
    }

    return "";
}

const getFileName = () => {
    let filename = `${Date.now()}.png`;
    do {
        filename = `${crypto.randomBytes(5).toString('hex')}-${filename}`;
    } while (fs.existsSync(path.join(UPLOADS_DIR, filename)));
    return filename;
}

const uploadLocalFile = (base64) => {
    const filename = getFileName();
    const filePath = path.join(UPLOADS_DIR, filename);
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    try {
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, {recursive: true});
        }

        fs.writeFileSync(filePath, base64Data, 'base64');
        return filename;
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    register: (req, res) => {
        Company.exists({email: req.body.email})
            .then( (companyExists) => {
                if (companyExists) {
                    return Promise.reject({
                        errors: {email: {message: "Email exists"}},
                    });
                }

                let body = {...req.body, logo: ""};
                if (req.body.logo) {
                    body.logo = uploadImage(req.body.logo);
                }
                return Company.create(body)
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