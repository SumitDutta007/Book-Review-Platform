// This is protection checking middleware
import jwt from "jsonwebtoken";

export default function protectedRoute(req, res, next) {
  // Get token from header or cookie
  const token = req.header("auth-token") || req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}
