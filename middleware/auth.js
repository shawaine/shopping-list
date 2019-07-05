const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check token
  if (!token) {
    res.status(401).json({ message: "no token, authorization denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Add user from payload
    res.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "token is not valid" });
  }
}

module.exports = auth;
