import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // ✅ 1. Try cookie FIRST
    let token = req.cookies?.aplica_token;

    // ✅ 2. Fallback to Authorization header (legacy safety)
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // ✅ 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 4. Attach FULL identity
    req.user = {
      _id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
