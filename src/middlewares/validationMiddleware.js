import Joi from "joi";
import { ValidationError } from "../utils/errors.js";

const registerUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validatoionMiddleware =
  (schema, dataParser) => async (req, res, next) => {
    if (typeof dataParser !== "function") {
      dataParser = (req) => {
        return req.body;
      };
    }

    try {
      await schema.validateAsync(dataParser(req));
      next();
    } catch (err) {
      next(new ValidationError(err.message));
    }
  };

export const registerUserValidator = validatoionMiddleware(registerUser);
export const loginUserValidator = validatoionMiddleware(loginUser);
