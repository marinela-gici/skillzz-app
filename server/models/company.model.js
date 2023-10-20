const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

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
        logo: {
            type: String,
            get: function (filename) {
                if(filename && fs.existsSync(path.join(UPLOADS_DIR, filename))) {
                    return `http://localhost:8000/images/${filename}`
                } else {
                    return "";
                }
            }
        }
    },
    {
        timestamps: true,
        toObject: {getters: true}
    }
);

CompanySchema.method('toJSON', function() {
    let company = this.toObject();
    delete company.confirmPassword;
    delete company.newPassword;
    delete company.confirmNewPassword;

    return company;
});

CompanySchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

CompanySchema.virtual("newPassword", {})
    .get(() => this._newPassword)
    .set((value) => (this._newPassword = value));

CompanySchema.virtual("confirmNewPassword")
    .get(() => this._confirmNewPassword)
    .set((value) => (this._confirmNewPassword = value));

CompanySchema.pre("validate", function (next) {
    // Check if confirmPassword is present and then compare it with password.
    if (this.confirmPassword !== undefined && this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Confirm Password must match password");
    }

    // Check if newPassword is present and validate required and minLength.
    if (this.newPassword !== undefined) {
        if (!this.newPassword) {
            this.invalidate("newPassword", "New password is required");
        }

        if (this.newPassword.length < 8) {
            this.invalidate("newPassword", "New password must be 8 characters or longer");
        }
    }

    // Check if confirmNewPassword is present and validate required and minLength.
    if (this.confirmNewPassword !== undefined) {
        if (!this.confirmNewPassword) {
            this.invalidate("confirmNewPassword", "Confirm new password is required");
        }

        if (this.confirmNewPassword.length < 8) {
            this.invalidate("confirmNewPassword", "Confirm new password must be 8 characters or longer");
        }
    }

    // Check if newPassword and confirmNewPassword are present and then compare them.
    if (this.newPassword !== undefined && this.confirmNewPassword !== undefined && this.newPassword !== this.confirmNewPassword) {
        this.invalidate("confirmNewPassword", "Confirm new password must match new password");
    }

    next();
});

CompanySchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model("Company", CompanySchema);