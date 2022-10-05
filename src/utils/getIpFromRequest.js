export const getIpFromRequest = (req) =>
  req.headers["cf-connecting-ip"] ||
  req.headers["x-forwarded-for"]?.split(",").shift().trim() ||
  req.socket?.remoteAddress;
