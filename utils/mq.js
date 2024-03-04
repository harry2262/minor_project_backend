const { Queue, Worker } = require("bullmq");

const emailQueue = new Queue("emailQueue");

module.exports = emailQueue;
