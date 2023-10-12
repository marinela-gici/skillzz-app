const Company = require("../models/company.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getToken = (user) => {
  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY);
};

module.exports = {
  register: (req, res) => {
    Company.exists({ email: req.body.email })
      .then((companyExists) => {
        if (companyExists) {
          return Promise.reject({
            errors: { email: { message: "Email exists" } },
          });
        }
        return Company.create(req.body)
          .then((company) => {
            res
              .cookie("companytoken", getToken(company), {
                httpOnly: true,
              })
              .json({ msg: "success!", company: company });
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
    const company = await Company.findOne({ email: req.body.email });

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
      .json({ msg: "success!" });
  },

  logout: (req, res) => {
    res.clearCookie("companytoken");
    res.sendStatus(200);
  },
};