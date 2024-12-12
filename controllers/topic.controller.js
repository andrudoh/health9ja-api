// servcies
const { uploadImageSingle } = require("../middlewares/cloudinary");
const topicServices = require("../services/topic.service");

// utils
const { sendError, sendResponse } = require("../utils/response.util");

// Middlewares
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validate");

module.exports = {
  //   PING: Test API connection
  getPingController: (req, res) => {
    try {
      return res.status(200).send({
        success: true,
        message: "Pong!",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //  All
  getAllTopicsController: async (req, res, next) => {
    try {
      const allTopics = await topicServices.allTopicsService();

      if (allTopics?.error) {
        return sendError(res, 400, allTopics?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all topics successfully",
        data: {
          allTopics,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //  One
  getOneTopicController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const topic = await topicServices.oneTopicService(id);

      if (topic?.error) {
        return sendError(res, 400, topic?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched topic successfully",
        data: {
          topic,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Add
  postAddTopicController: async (req, res, next) => {
    console.log("🚀 ~ postAddTopicController: ~ req:", req.file);
    try {
      // Run Hapi/Joi validation
      // const { error } = await registerValidation.validateAsync(body);
      // if (error) return res.status(400).send(error.details[0].message);

      // let image = "";
      // if (req.file) {
      //   // send image to Cloudinary
      //   image = await uploadImageSingle(req, res, next);
      // }

      // const image = req.file;
      // const topic = await topicServices.addTopicService({ ...req.body, image });
      console.log("🚀 ~ postAddTopicController: ~ req.body:", req.body);
      const topic = await topicServices.addTopicService(req.body);
      console.log("🚀 ~ postAddTopicController: ~ topic:", topic);

      if (topic?.error) {
        console.log(
          "🚀 ~ postAddTopicController: ~ topic?.error:",
          topic?.error
        );
        return sendError(res, 400, topic?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Topic created successfully",
        data: {
          topic,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Edit
  postEditTopicController: async (req, res, next) => {
    console.log("🚀 ~ postEditTopicController: ~ req.body: ", req.body);
    try {
      const { id } = req.query;
      // let image = req.body.image;
      // if (req.file) {
      //   // send image to Cloudinary
      //   image = await uploadImageSingle(req, res, next);
      // }

      const topic = await topicServices.editTopicService(req.body, id);
      console.log("🚀 ~ postEditTopicController: ~ topic:", topic);

      if (topic?.error) {
        console.log(
          "🚀 ~ postEditTopicController: ~ topic?.error:",
          topic?.error
        );
        return sendError(res, 400, topic?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Edited topic successfully",
        data: {
          topic,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //   Delete
  postDeleteTopicController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const topic = await topicServices.deleteTopicService(id);

      if (topic?.error) {
        return sendError(res, 400, topic?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted topic successfully",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },
};
