import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, TOKEN_EXPIRATION_PERIOD } from "../config.js";
import { ReferralPartnerStatistic } from "../schemas/referralPartnerStatistic.js";
import { User } from "../schemas/user.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/errors.js";

export const registerUser = async (data) => {
  try {
    const [user, ip, referredUser] = await Promise.all([
      User.findOne({ email: data.email }),
      User.findOne({ registrationIp: data.registrationIp }),
      data.referralHash &&
        ReferralPartnerStatistic.findOne({ referralHash: data.referralHash }),
    ]);

    if (user) throw new ConflictError("Email already in use.");
    if (ip) throw new ConflictError("Somebody already registred from this ip");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });

    if (referredUser) {
      await ReferralPartnerStatistic.create({
        userId: newUser.id,
        referredByUserId: referredUser.userId,
      });
      referredUser.referredUsersIds.push(newUser.id);
      await referredUser.save();
    }

    return { status: "Success" };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });

    if (!user) throw new NotFoundError("User not found");

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) throw new BadRequestError("Incorrect password");

    const token = jwt.sign({ email: data.email }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION_PERIOD,
    });

    return { token };
  } catch (error) {
    throw error;
  }
};
