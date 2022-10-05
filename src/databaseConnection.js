import mongoose from "mongoose";
import { DB_HOST } from "./config.js";

export default mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
