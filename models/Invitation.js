const mongoose = require("mongoose");

const InvitationSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  receiver: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  sentDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = Invitation = mongoose.model("invitation", InvitationSchema);
