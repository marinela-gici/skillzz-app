const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        experience: {
            type: String,
            required: [true, "Experience is required"],
        },
        employmentType: {
            type: String,
            required: [true, "Employment type is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [1, "Salary must be greater than 1"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        applications: [{type: mongoose.Schema.Types.ObjectId, ref: "Application"}],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Job", JobSchema);
