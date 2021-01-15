const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: String,
  userId: [
    { type: Schema.Types.ObjectId, ref: "userId", default: [] },
  ],
  
  

});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;