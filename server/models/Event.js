const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  start: String,
  end: String,
  resourceId: { type: Schema.Types.ObjectId, ref: "resourceId" },
  type: {
    type: String,
    enum: ["shift", "off", "oncall"],
    default: "shift",
  },
  color: { type: String, default: "#00bcd4" },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
