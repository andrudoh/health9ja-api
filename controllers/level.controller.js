// servcies
const levelServices = require("../services/level.service");

// utils
const { sendError, sendResponse } = require("../utils/response.util");

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
  getAllLevelsController: async (req, res, next) => {
    try {
      const allLevels = await levelServices.allLevelsService();

      if (allLevels?.error) {
        return sendError(res, 400, allLevels?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all levels successfully",
        data: {
          allLevels,
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
  getOneLevelController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const level = await levelServices.oneLevelService(id);

      if (level?.error) {
        return sendError(res, 400, level?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched level successfully",
        data: {
          level,
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
  postAddLevelController: async (req, res, next) => {
    try {
      const level = await levelServices.addLevelService(req.body);

      if (level?.error) {
        return sendError(res, 400, level?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Level created successfully",
        data: {
          level,
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
  putEditLevelController: async (req, res, next) => {
    try {
      const { id } = req.query;
      console.log("🚀 ~ postEditLevelController: ~ id:", id);
      console.log("🚀 ~ postEditLevelController: ~ req.body:", req.body);
      const level = await levelServices.editLevelService(req.body, id);

      if (level?.error) {
        return sendError(res, 400, level?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Edited level successfully",
        data: {
          level,
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
  postDeleteLevelController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const level = await levelServices.deleteLevelService(id);

      if (level?.error) {
        return sendError(res, 400, level?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted level successfully",
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
