const mongoose = require("mongoose");

const RetrospectiveSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  columns: [
    {
      title: {
        type: String,
        required: true,
      },
      comments: [
        {
          text: {
            type: String,
            required: true,
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
    },
  ],
});

module.exports = Retrospective = mongoose.model(
  "retrospective",
  RetrospectiveSchema
);
