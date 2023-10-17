const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Company name is required"],
        },
        vat: {
            type: String,
            required: [true, "Company VAT is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters or longer"],
        },
    },
    {timestamps: true}
);

CompanySchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

// CompanySchema.virtual("newPassword")
//     .get(() => this._newPassword)
//     .set((value) => (this._newPassword = value));
// CompanySchema.virtual("confirmNewPassword")
//     .get(() => this._confirmNewPassword)
//     .set((value) => (this._confirmNewPassword = value));

CompanySchema.pre("validate", function (next) {
    console.log('pre avlidat')
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Confirm Password must match password");
    }

    // if (! this.newPassword.check(this.newPassword).min(8)) {
    //     this.invalidate('newPassword', 'New password must must be 8 characters or longer.');
    // }
    // if (!val.check(this._confirmNewPassword).min(8)) {
    //     this.invalidate('confirmNewPassword', 'Confirm new password must be 8 characters or longer.');
    // }
    // if (this._newPassword !== this._confirmNewPassword) {
    //     this.invalidate("confirmNewPassword", "Confirm new password must match new password");
    // }


    next();
});

CompanySchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model("Company", CompanySchema);
