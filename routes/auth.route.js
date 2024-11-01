// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const auth = require("../controllers/auth.controller");

// Stuff
const router = express.Router();

const validate = require("../middlewares/validateSchema.middleware");

// schemas
const { signUpSchema, loginSchema } = require("../schemas/auth.schema");

// middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
const { authorize } = require("../middlewares/roleCheck");

// Routes
router.get(
  "/ping",
  // isAuthenticated,
  auth.getPingController
);

// POST Signup
router.post("/register", validate(signUpSchema), auth.postSignupController);

// GET Verify email
router.get("/verify", auth.getVerifyEmailController);

// POST Forgot password
router.post("/forgot-password", auth.postForgotPasswordController);

// POST reset password
router.post("/reset-password", auth.postResetPasswordController);

// POST Login
router.post("/login", validate(loginSchema), auth.postLoginController);

// POST Logout
router.get("/logout", auth.postLogoutController);

module.exports = router;
