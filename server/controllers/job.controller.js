const Job = require("../models/job.model");
const Application = require("../models/application.model");
const {request, response} = require("express");

module.exports = {
    createJob: (req, res) => {
        Job.create({...req.body, company: req.user._id})
            .then((saveResult) => res.json(saveResult))
            .catch((err) => res.status(400).json(err));
    },

    getCompanyJobs: (request, response) => {
        const limit = request.query.limit ?? 10;
        const skip = request.query.skip ?? 0;

        Job.find({company: request.user._id}).populate('applications').skip(skip).limit(limit).sort({createdAt: 'desc'})
            .then((jobs) => {
                console.log(jobs);
                response.json(jobs);
            })
            .catch((err) => {
                console.log(err);
                response.json(err);
            });
    },

    getCompanyJob: (request, response) => {
        Job.findOne({_id: request.params.id, company: request.user._id})
            .populate('applications')
            .then((job) => {
                console.log(job);
                response.json(job);
            })
            .catch((err) => {
                console.log(err);
                response.json(err);
            });
    },

    updateJob: (request, response) => {
        Job.findOneAndUpdate({_id: request.params.id}, request.body, {
            new: true,
        })
            .then((updatedJob) => response.json(updatedJob))
            .catch((err) => response.status(400).json(err));
    },

    deleteJob: (request, response) => {
        Job.deleteOne({_id: request.params.id})
            .then((deleteConfirmation) => {
                Application.deleteMany({job: request.params.id})
                    .then(res => console.log(res))

                response.json(deleteConfirmation);
            })
            .catch((err) => response.json(err));
    },

    getDashboard: (request, response) => {
        Job.countDocuments({company: request.user._id}, function (err, count) {
            if (err) {
                console.log(err)
            } else {
                console.log("Count :", count)
            }
        });
    },

    getAllJobs: (request, response) => {
        const limit = request.query.limit ?? 10;
        const skip = request.query.skip ?? 0;
        Job.find({}).populate('applications').skip(skip).limit(limit).sort({createdAt: 'desc'})
            .then((jobs) => {
                // console.log(jobs);
                response.json(jobs);
            })
            .catch((err) => {
                console.log(err);
                response.json(err);
            });
    },

    getOneJob: (request, response) => {
        Job.findOne({_id: request.params.id})
            .populate('applications')
            .then((job) => {
                console.log(job);
                response.json(job);
            })
            .catch((err) => {
                console.log(err);
                response.json(err);
            });
    },

};
