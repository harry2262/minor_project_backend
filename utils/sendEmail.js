const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({ path: "./config/config.env" });
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SMTP_PASSWORD);
const sendEmail = async (options) => {
  // var transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_EMAIL,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });
  // const transporter = nodemailer.createTransport(
  //   nodemailerSendgrid({
  //     apiKey: process.env.SENDGRID_PASSWORD,
  //   }),
  // );
  const message = {
    from: "jashanbath608@gmail.com ",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  return await sendgrid.send(message);
};

module.exports = sendEmail;
