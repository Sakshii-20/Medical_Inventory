const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ----------------------- SIGNUP -----------------------
async function createuser(req, res) {
  try {
    const { userId, username, password, role, email } = req.body;

    if (!username || !email || !password) {
      return res.redirect("/signup?error=missing");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      userId,
      username,
      password: hash,
      role,
      email
    });

    // JWT Token
    const token = jwt.sign(
      { _id: createdUser._id, email: createdUser.email, role: createdUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.redirect("/dashboard");

  } catch (err) {

    // Unique field errors
    if (err.code === 11000) {
      if (err.keyValue.email) return res.redirect("/signup?error=email");
      if (err.keyValue.username) return res.redirect("/signup?error=username");
      if (err.keyValue.userId) return res.redirect("/signup?error=userId");
    }

    console.error("Signup ERROR:", err);
    return res.redirect("/signup?error=unknown");
  }
}

// ----------------------- LOGIN -----------------------
async function loginuser(req, res) {
  try {
    const { email, username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (!user) return res.redirect("/signin?error=invalid");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.redirect("/signin?error=invalid");

    // Create JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.redirect("/dashboard");

  } catch (err) {
    console.error("Login ERROR:", err);
    return res.redirect("/signin?error=unknown");
  }
}

// ----------------------- VIEW DASHBOARD -----------------------
function viewdashboard(req, res) {
  res.render("dashboard", { user: req.user });
}

// ----------------------- LOGOUT -----------------------
function logoutuser(req, res) {
  res.clearCookie("token");
  res.redirect("/signin");
}

module.exports = { createuser, loginuser, viewdashboard, logoutuser };
