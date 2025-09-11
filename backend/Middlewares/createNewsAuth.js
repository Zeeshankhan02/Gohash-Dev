import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Token uthao headers se
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // 2. "Bearer <token>" me se token alag karo
  const token = authHeader.split(" ")[1];

  try {
    
    // 3. Verify karo token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. User ki info request object me save karo
    req.user = decoded;

    // 5. Next function chalao
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
