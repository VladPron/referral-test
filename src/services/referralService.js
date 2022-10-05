import * as uuid from "uuid";

import { HOST, PORT } from "../config.js";
import { ReferralPartnerStatistic } from "../schemas/referralPartnerStatistic.js";
import { NotFoundError } from "../utils/errors.js";

export const createReferralLink = async (userId) => {
  try {
    let userStatistic = await ReferralPartnerStatistic.findOne({ userId });

    if (!userStatistic)
      userStatistic = await ReferralPartnerStatistic.create({
        userId,
        referralHash: uuid.v4(),
      });
    else if (!userStatistic.referralHash) {
      userStatistic.referralHash = uuid.v4();
      await userStatistic.save();
    }

    return {
      referralLink: `${HOST}:${PORT}/referral/${userStatistic.referralHash}`,
    };
  } catch (error) {
    throw error;
  }
};

export const saveNewVisitorsIp = async (visitorIp, referralHash) => {
  try {
    const referral = await ReferralPartnerStatistic.findOne({
      referralHash: referralHash,
    });

    if (!referral) return false;

    const ip = referral.uniqueVisitorsIps.find((el) => el === visitorIp);

    if (!ip) referral.uniqueVisitorsIps.push(visitorIp);

    await referral.save();

    return true;
  } catch (error) {
    throw error;
  }
};

export const getUserReferralStatistic = async (userId) => {
  try {
    const referral = await ReferralPartnerStatistic.findOne({ userId });
    if (!referral) throw new NotFoundError("Statistic not found");
    return {
      registred: referral.referredUsersIds.length,
      viewed: referral.uniqueVisitorsIps.length,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteReferralLink = async (userId) => {
  try {
    const referral = await ReferralPartnerStatistic.findOne({ userId });
    referral.referralHash = "";
    await referral.save();

    return { status: "Success" };
  } catch (error) {
    throw error;
  }
};
