module.exports = {
    contact: async (req, res) => {
        try {
            const token = req.body.token;
            if (!token) {
                return res.status(500).json({message: "reCAPTCHA is required! Please, try again!"});
            }

            const response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
                {
                    method: "POST"
                }
            );
            const data = await response.json();
            if (data.success) {
                // recaptcha verified, continue to send email
                res.json({message: "Success!"});
            } else {
                res.status(500).json({message: "reCAPTCHA not verified! Please, try again!"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Error verifying reCAPTCHA"});
        }
    }
}
