const mongoose = require("mongoose");
const TareaSchema = mongoose.Schema({
  tarea: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  proyectoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Tarea", TareaSchema);
