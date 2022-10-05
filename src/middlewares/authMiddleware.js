import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../config.js";
import { User } from "../schemas/user.js";
import { AppError, UnauthorizedError } from "../utils/errors.js";

export const auth = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    next(new UnauthorizedError("You need to provide token"));
    return;
  }

  const [_, token] = bearerHeader.split(" ");

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findOne({ email: payload.email }).select({
      password: 0,
    });

    req.user = user;

    next();
  } catch (error) {
    next(new AppError(error.message));
  }
};
