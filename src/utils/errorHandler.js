import {
  AppError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./errors.js";

// eslint-disable-next-line
export const errorHandler = (err, _, res, __) => {
  if (err instanceof AppError) {
    if (err instanceof BadRequestError) {
      return res.status(400).json({ message: err.message });
    }
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({ message: err.message });
    }
    if (err instanceof ForbiddenError) {
      return res.status(403).json({ message: err.message });
    }
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.message });
    }
    if (err instanceof ConflictError) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Internal server error." });
};
