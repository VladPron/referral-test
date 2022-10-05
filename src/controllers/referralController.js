import express from "express";

import { auth } from "../middlewares/authMiddleware.js";
import {
  createReferralLink,
  deleteReferralLink,
  getUserReferralStatistic,
  saveNewVisitorsIp,
} from "../services/referralService.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { getIpFromRequest } from "../utils/getIpFromRequest.js";

export const referralRouter = express.Router();

referralRouter.get(
  "/statistic",
  auth,
  asyncWrapper(async (req, res) => {
    res.json(await getUserReferralStatistic(req.user.id));
  })
);

referralRouter.get(
  "/:referralHash",
  asyncWrapper(async (req, res) => {
    const { referralHash } = req.params;

    const visitorIp = getIpFromRequest(req);

    try {
      const result = await saveNewVisitorsIp(visitorIp, referralHash);

      if (result)
        res
          .cookie("referral", referralHash, { maxAge: 3600 * 48 })
          .redirect("/auth/register");
      else res.redirect("/auth/register");
    } catch (error) {
      throw error;
    }
  })
);

referralRouter.post(
  "/",
  auth,
  asyncWrapper(async (req, res) => {
    res.json(await createReferralLink(req.user.id));
  })
);

referralRouter.delete(
  "/",
  auth,
  asyncWrapper(async (req, res) => {
    res.json(await deleteReferralLink(req.user.id));
  })
);
