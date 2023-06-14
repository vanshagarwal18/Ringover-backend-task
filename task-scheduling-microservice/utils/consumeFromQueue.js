const amqplib = require("amqplib");
const { addTask } = require("../controllers/taskController");

// To consume from queue and add to database whenever server becomes functional
exports.consumeFromQueue = async () => {
  const q = "task";
  const conn = await amqplib.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue(q);
  ch.consume(q, async (msg) => {
    if (msg !== null) {
      console.log(`Got msg ${msg.content.toString()}`);
      const qm = JSON.parse(msg.content.toString());
      await addTask(qm);
      return ch.ack(msg);
    }
  });
};
