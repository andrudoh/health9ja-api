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
const { addLevelSchema, editLevelSchema } = require("../schemas/level.schema");

// middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
const { authorize } = require("../middlewares/roleCheck");

// Routes
router.get(
  "/ping",
  isAuthenticated,
  authorize("admin"),
  auth.getPingController
);

// POST Signup
router.post(
  "/levels/add",
  authorize("admin"),
  validate(addLevelSchema),
  auth.postSignupController
);

// PUT Signup
router.put(
  "/levels/edit",
  authorize("admin"),
  validate(editLevelSchema),
  auth.postSignupController
);

// GET All Levels
router.get("/levels", authorize("admin"), auth.postLoginController);

module.exports = router;
