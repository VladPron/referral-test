import express from "express";

import {
  loginUserValidator,
  registerUserValidator,
} from "../middlewares/validationMiddleware.js";
import { loginUser, registerUser } from "../services/authService.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { getIpFromRequest } from "../utils/getIpFromRequest.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  registerUserValidator,
  asyncWrapper(async (req, res) => {
    const registrationIp = getIpFromRequest(req);

    const { referral } = req.cookies;

    res.json(
      await registerUser({
        ...req.body,
        registrationIp,
        referralHash: referral,
      })
    );
  })
);

authRouter.post(
  "/login",
  loginUserValidator,
  asyncWrapper(async (req, res) => {
    console.log(req.cookies.referral);
    res.json(await loginUser(req.body));
  })
);
