const { Queue, Worker } = require("bullmq");

const emailQueue = new Queue("emailQueue");
const timedQueue = new Queue("timedQueue");
module.exports = { emailQueue, timedQueue };
