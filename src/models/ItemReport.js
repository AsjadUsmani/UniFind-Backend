import mongoose from "mongoose";

const itemReportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      index: true
    },
    campus: String,
    building: String,
    locationText: String,
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["open", "claimed", "resolved"],
      default: "open",
      index: true
    }
  },
  { timestamps: true }
);

// Enable text search
itemReportSchema.index({ title: "text", description: "text" });

export const ItemReport = mongoose.model('ItemReport', itemReportSchema);