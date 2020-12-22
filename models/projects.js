const mongoose = require("mongoose");
const ProjectSchema = mongoose.Schema({
  creation_Date: { type: Date, default: Date.now() },
  creation_User: { type: String, required: true, trim: true },
  modification_Date: { type: Date, default: Date.now() },
  modification_User: { type: String, required: true, trim: true },
  projectName: { type: String, required: true, trim: true },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Project", ProjectSchema);
