import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationIp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", user);
