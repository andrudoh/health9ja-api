// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const level = require("../controllers/level.controller");

// Stuff
const router = express.Router();

// schemas
const { addLevelSchema, editLevelSchema } = require("../schemas/level.schema");

// middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
const { authorize } = require("../middlewares/roleCheck");
const validate = require("../middlewares/validateSchema.middleware");

// Routes
router.get(
  "/ping",
  // isAuthenticated,
  // authorize("admin"),
  level.getPingController
);

// GET All Levels
router.get(
  "/all",
  // authorize("admin"),
  level.getAllLevelsController
);

// GET All Levels
router.get(
  "/one",
  // authorize("admin"),
  level.getOneLevelController
);

// POST Signup
router.post(
  "/add",
  // authorize("admin"),
  validate(addLevelSchema),
  level.postAddLevelController
);

// PUT Signup
router.put(
  "/edit",
  // authorize("admin"),
  validate(editLevelSchema),
  level.putEditLevelController
);

// DELETE Signup
router.delete(
  "/delete",
  // authorize("admin"),
  level.postDeleteLevelController
);

module.exports = router;
