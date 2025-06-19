import express from "express";
import passport from "passport";
import { signup, login, googleCallback } from "../controllers/authController.js";

const authRouter = express.Router();

// Email/Password routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);

// Google OAuth2 routes
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  googleCallback
);

export default authRouter;
