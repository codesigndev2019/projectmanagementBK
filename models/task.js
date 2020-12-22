const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  creation_Date: {
    type: Date,
    default: Date.now(),
  },
  creation_User: {
    type: String,
    required: true,
    trim: true,
  },
  modification_Date: {
    type: Date,
    default: Date.now(),
  },
  modification_User: { type: String, required: true, trim: true },
  project_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
