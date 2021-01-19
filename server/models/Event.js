const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  start: String,
  end: String,
  resourceId: [{ type: Schema.Types.ObjectId, ref: "resourceId" }],
  type: {
    type: String,
    enum: ["shift", "off", "oncall"],
  },
  bgColor: { type: String, default: "" },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
