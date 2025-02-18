const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/kafka_offsets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const OffsetSchema = new mongoose.Schema({
  requestId: String,
  status: String,  // 'processing', 'completed', 'failed'
  partition: Number,
  offset: Number,
});

const OffsetModel = mongoose.model("Offset", OffsetSchema);

module.exports = OffsetModel;
