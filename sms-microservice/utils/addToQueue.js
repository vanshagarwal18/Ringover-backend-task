const { v4: uuidv4 } = require("uuid");
const amqplib = require("amqplib");

//to push sms task to queue for job scheduler
exports.addToQueue = async ({ name, dependency, priority }) => {
  const q = "task";
  const conn = await amqplib.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue(q);
  const qm = JSON.stringify({
    taskId: uuidv4(),
    taskName: name,
    type: "sms",
    dependency,
    priority,
    timestamp: new Date().getTime(),
  });
  return ch.sendToQueue(q, Buffer.from(qm, "utf8"));
};
