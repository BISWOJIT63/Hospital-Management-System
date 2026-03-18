import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/profile", protect, updateUserProfile);

router.get("/google", (req, res, next) => {
  const role = req.query.role || "Patient";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: role,
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    const token = generateToken(req.user._id, req.user.role);
    const userRole = req.user.role;
    res.redirect(
      `http://localhost:5173/login?token=${token}&role=${userRole}&name=${encodeURIComponent(req.user.name)}`,
    );
  },
);

router.get("/facebook", (req, res, next) => {
  const role = req.query.role || "Patient";
  passport.authenticate("facebook", {
    scope: ["email"],
    state: role,
  })(req, res, next);
});

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    const token = generateToken(req.user._id, req.user.role);
    const userRole = req.user.role;
    res.redirect(
      `http://localhost:5173/login?token=${token}&role=${userRole}&name=${encodeURIComponent(req.user.name)}`,
    );
  },
);

export default router;
