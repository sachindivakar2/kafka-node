const mongoose = require("mongoose");

mongoose.connect("mongodb://admin:password@localhost:27017/banking", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TransactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  date: Date
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

const seedData = async () => {
  await Transaction.deleteMany({});
  for (let i = 0; i < 1000; i++) {
    await Transaction.create({
      userId: `user-${Math.floor(Math.random() * 100)}`,
      amount: Math.random() * 1000,
      date: new Date()
    });
  }
  console.log("✅ Seed Data Inserted");
  process.exit();
};

seedData();
