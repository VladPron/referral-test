import mongoose from "mongoose";

const Schema = mongoose.Schema;

const referralPartnerStatistic = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    referralHash: {
      type: String,
      // unique: true,
    },
    referredByUserId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    referredUsersIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    uniqueVisitorsIps: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ReferralPartnerStatistic = mongoose.model(
  "referral-partner-statistic",
  referralPartnerStatistic
);
