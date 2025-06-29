const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/contact", async (req, res) => {
  const { user_name, user_email, message } = req.body;

  // Validate required fields
  if (!user_name || !user_email || !message) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required." });
  }

  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing email environment variables");
    return res.status(500).json({
      success: false,
      msg: "Email configuration is missing. Please check environment variables.",
    });
  }

  try {
    console.log("Creating email transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Sending email...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself
      subject: `Contact Form Submission from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Email sent successfully!");
    res.json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to send message.",
      error: error.message,
    });
  }
});

module.exports = router;
