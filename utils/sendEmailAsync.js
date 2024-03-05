const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SMTP_PASSWORD);
const sendEmailAsync = async (options) => {
  const message = {
    from: "jashanbath608@gmail.com ",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  const res = await sendgrid.send(message);
  console.log(res);
};
module.exports = sendEmailAsync;
