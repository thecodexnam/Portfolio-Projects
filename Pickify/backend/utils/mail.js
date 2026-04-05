import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

//Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
});

//Send OTP Mail
export const sendOtpMail = async (email,otp)=>{
  try {
    await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to:email,
      subject:"Reset Your Password",
      html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #666;">Hello,</p>
        <p style="color: #666;">You requested to reset the password for your account.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
        </div>
        <p style="color: #666;">This OTP is valid for <strong>10 minutes</strong>.</p>
        <p style="color: #666;">If you did not request this reset, please ignore this email.</p>
        <p style="color: #666;">Thank you,<br>Pickify Team</p>
      </div>
      `
    })
  } catch (error) {
    console.log("Nodemailer error:", error);
    throw error;
  }
}