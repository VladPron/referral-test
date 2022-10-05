import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "mysecretkey";
export const HOST = process.env.HOST || "localhost";
export const TOKEN_EXPIRATION_PERIOD =
  process.env.TOKEN_EXPIRATION_PERIOD || "1d";
