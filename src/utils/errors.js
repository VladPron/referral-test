export class AppError extends Error {}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request Error") {
    super(message);
    this.name = "Bad Request Error";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized Error") {
    super(message);
    this.name = "Unauthorized Error";
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super(message);
    this.name = "Forbidden Error";
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message);
    this.name = "Validation Error";
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message);
    this.name = "Conflict Error";
  }
}
