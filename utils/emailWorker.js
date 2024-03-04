const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SMTP_PASSWORD);
const { Worker } = require("bullmq");

const emailhandler = async (job) => {
  console.log(`processing job with id ${job.id}`);
  const res = await sendgrid.send(job.data);
  console.log(res);
};
const worker = new Worker("emailQueue", emailhandler, {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

worker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result: ${JSON.stringify(result)}`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed with error: ${err.message}`);
});
