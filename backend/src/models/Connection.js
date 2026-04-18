import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

// Prevent duplicate connections between the same two users
connectionSchema.index({ requester: 1, receiver: 1 }, { unique: true });

export default mongoose.model("Connection", connectionSchema);
