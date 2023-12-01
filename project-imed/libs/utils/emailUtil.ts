//@ts-ignore
import nodemailer from 'nodemailer';
import adminConfModel from '../models/adminConfModel';


export async function sendMail(subject: any, toEmail: any, otpText: any) {

  const { smtp }: any = await adminConfModel.findOne();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: smtp.google.email,
      pass: smtp.google.password,
    },
  });

  let mailOptions = {
    from: smtp.google.email,
    to: toEmail,
    subject: subject,
    text: `your OTP is ${otpText}`,
  };
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log("error", error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}