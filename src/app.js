import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import databaseConnection from "./databaseConnection.js";
import { PORT } from "./config.js";
import { authRouter } from "./controllers/authController.js";
import { errorHandler } from "./utils/errorHandler.js";
import { AppError } from "./utils/errors.js";
import { referralRouter } from "./controllers/referralController.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/referral", referralRouter);

app.use(errorHandler);

databaseConnection
  .then(() => {
    console.log("👌 Mongoose connected");
    app.listen(PORT, () => {
      console.log(`👌 API listening listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    throw new AppError(`Database connection error. ${err.message}`);
  });
