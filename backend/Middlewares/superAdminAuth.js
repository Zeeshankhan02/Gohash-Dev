import jwt from "jsonwebtoken";

export const superAdminAuth = (req, res, next) => {
  try {
    const authHeaderToken = req.headers["token"];
    if (!authHeaderToken) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const verifiedToken = jwt.verify(authHeaderToken, process.env.JWT_SECRET);
    if (!verifiedToken) {
      return res.status(401).json({ msg: "Invalid token provided" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};
