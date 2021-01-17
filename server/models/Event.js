const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  start_date: String,
  end_date: String,
  userId: [{ type: Schema.Types.ObjectId, ref: "userId" }],
  type: {
    type: String,
    enum: ["shift", "off", "oncall"],
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
