const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Aplica" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Aplica OTP Verification Code",
    html: `
      <h2>Verify your email</h2>
      <p>Your OTP code is:</p>
      <h1>${otp}</h1>
      <p>This code will expire in 10 minutes.</p>
    `,
  });
};
