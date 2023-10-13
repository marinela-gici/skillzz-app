const Application = require("../models/application.model");

module.exports = {
    createApplication: (req, res) => {
        Application.create(req.body)
            .then((saveResult) => res.json(saveResult))
            .catch((err) => res.status(400).json(err));
    },
}
