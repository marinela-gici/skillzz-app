const Job = require("../models/job.model");

module.exports = {
  createJob: (req, res) => {
    Job.create(req.body)
      .then((saveResult) => res.json(saveResult))
      .catch((err) => res.status(400).json(err));
  },

  getAllJobs: (request, response) => {
    const limit = request.query.limit ?? 10;
    const offset = request.query.offset ?? 0;
    Job.find({}).populate('applications').skip(offset).limit(limit).sort({createdAt: 'desc'})
      .then((jobs) => {
        console.log(jobs);
        response.json(jobs);
      })
      .catch((err) => {
        console.log(err);
        response.json(err);
      });
  },
  
  getOneJob: (request, response) => {
    Job.findOne({ _id: request.params.id })
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

//   deleteOnePirate: (request, response) => {
//     Pirate.deleteOne({ _id: request.params.id })
//       .then((deleteConfirmation) => response.json(deleteConfirmation))
//       .catch((err) => response.json(err));
//   },

//   updatePirate: (request, response) => {
//     Pirate.findOneAndUpdate({ _id: request.params.id }, request.body, {
//       new: true,
//     })
//       .then((updatedPirate) => response.json(updatedPirate))
//       .catch((err) => response.json(err));
//   },
// }
};
