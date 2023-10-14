const Application = require("../models/application.model");
const Job = require("../models/job.model");

module.exports = {
    createApplication: (req, res) => {
        Application.create(req.body)
            .then((application) => {
                // res.json(application);
                Job.findOne({_id: application.job})
                    .then(job => {
                        if(job) {
                            console.log(job)
                            job.applications.push(application._id)
                            job.save();
                            res.json(application)
                        }
                    })
                    .catch((err) => console.log('test', err))
            })
            .catch((err) => res.status(400).json(err));
    },
}
