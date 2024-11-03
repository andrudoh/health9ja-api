// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const topic = require("../controllers/topic.controller");

// Stuff
const router = express.Router();

// schemas
const { addTopicSchema, editTopicSchema } = require("../schemas/topic.schema");

// middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
const { authorize } = require("../middlewares/roleCheck");
const validate = require("../middlewares/validateSchema.middleware");
const { multerUploads } = require("../middlewares/multer");

// Routes
router.get(
  "/ping",
  // isAuthenticated,
  // authorize("admin"),
  topic.getPingController
);

// GET All Topics
router.get(
  "/all",
  // isAuthenticated,
  // authorize("admin"),
  topic.getAllTopicsController
);

// GET One Topics
router.get(
  "/one",
  // isAuthenticated,
  // authorize("admin"),
  topic.getOneTopicController
);

// POST Signup
router.post(
  "/add",
  // isAuthenticated,
  // authorize("admin"),
  // validate(addTopicSchema),
  multerUploads.single("image"),
  topic.postAddTopicController
);

// PUT Signup
router.put(
  "/edit",
  // isAuthenticated,
  // authorize("admin"),
  // validate(editTopicSchema),
  multerUploads.single("image"),
  topic.postEditTopicController
);

// DELETE Signup
router.delete(
  "/delete",
  // isAuthenticated,
  // authorize("admin"),
  topic.postDeleteTopicController
);

module.exports = router;
