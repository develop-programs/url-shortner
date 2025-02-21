import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    redirectURL: {
      type: String,
      required: true,
      unique: true,
    },
    visited: [
      {
        type: Date,
        default: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
