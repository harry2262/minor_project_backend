const dotenv = require("dotenv");
const emailQueue = require("./mq");
dotenv.config({ path: "./config/config.env" });
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

  return await emailQueue.add("send-email", message);
};

module.exports = sendEmail;
