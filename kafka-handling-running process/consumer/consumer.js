const { Kafka } = require("kafkajs");
const OffsetModel = require("./db");

const kafka = new Kafka({
  clientId: "bank-statement-service",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "bank-statement-group" });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "bank-statements", fromBeginning: false });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      const { requestId, userId } = JSON.parse(message.value.toString());

      const existingRequest = await OffsetModel.findOne({ requestId });
      if (existingRequest?.status === "completed") {
        console.log(`🔄 Skipping processed request: ${requestId}`);
        return;
      }

      console.log(`🏦 Processing bank statement for ${userId}`);
      await new Promise((resolve) => setTimeout(resolve, 10000));

      await OffsetModel.updateOne(
        { requestId },
        { status: "completed", partition, offset: message.offset },
        { upsert: true }
      );

      await consumer.commitOffsets([
        { topic, partition, offset: (Number(message.offset) + 1).toString() }
      ]);
    }
  });
};

consumeMessages().catch(console.error);
