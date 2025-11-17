const jwt = require("jsonwebtoken");
const User = require('../models/User');

async function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/signin");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      res.clearCookie("token");
      return res.redirect("/signin");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.clearCookie("token");
    return res.redirect("/signin");
  }
}

module.exports = { requireAuth };
