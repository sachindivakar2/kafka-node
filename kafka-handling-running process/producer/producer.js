const { Kafka } = require("kafkajs");
const express = require("express");

const kafka = new Kafka({
  clientId: "bank-statement-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();
const app = express();
app.use(express.json());

app.post("/request-statement", async (req, res) => {
  const { requestId, userId } = req.body;

  await producer.connect();
  await producer.send({
    topic: "bank-statements",
    messages: [{ key: userId, value: JSON.stringify({ requestId, userId }) }]
  });

  console.log(`📤 Sent request for User: ${userId}`);
  await producer.disconnect();
  res.send({ message: "Request sent successfully" });
});

app.listen(4000, () => console.log("🚀 Producer API running on port 4000"));
