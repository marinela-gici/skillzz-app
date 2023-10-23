const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email",
            },
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Application", ApplicationSchema);
