const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const producer = kafka.producer();

const produceMessages = async () => {
  await producer.connect();
  console.log("🚀 Producer connected");

  for (let i = 1; i <= 10; i++) {
    const message = `Message ${i}`;
    await producer.send({
      topic: "test-topic",
      messages: [{ key: `key-${i}`, value: message }],
    });
    console.log(`✅ Sent: ${message}`);
  }

  await producer.disconnect();
  console.log("🔌 Producer disconnected");
};

produceMessages().catch(console.error);
