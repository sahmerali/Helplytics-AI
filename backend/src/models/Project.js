import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["Frontend", "Backend", "Design", "DevOps", "Other"],
      default: "Other" 
    },
    urgency: { 
      type: String, 
      enum: ["High", "Medium", "Low"],
      default: "Medium" 
    },
    location: { type: String, default: "Remote" },
    requiredSkills: { type: [String], default: [] },
    status: { type: String, enum: ["Open", "In Progress", "Completed"], default: "Open" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
