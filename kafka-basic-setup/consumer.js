const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const consumeMessages = async () => {
  await consumer.connect();
  console.log("🚀 Consumer connected");

  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `📩 Received (Partition: ${partition}):`,
        message.value.toString()
      );

      // Simulating manual offset handling (acknowledging processing)
      await consumer.commitOffsets([
        { topic, partition, offset: (Number(message.offset) + 1).toString() },
      ]);
    },
  });
};

consumeMessages().catch(console.error);
