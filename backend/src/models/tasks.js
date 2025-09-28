const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;