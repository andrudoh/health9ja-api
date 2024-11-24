// servcies
const userServices = require("../services/user.service");

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
  getAllUsersController: async (req, res, next) => {
    try {
      const allUsers = await userServices.allUsersService();

      if (allUsers?.error) {
        return sendError(res, 400, allUsers?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all users successfully",
        data: {
          allUsers,
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
  getOneUserController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const user = await userServices.oneUserService(id);

      if (user?.error) {
        return sendError(res, 400, user?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched user successfully",
        data: {
          user,
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

  //  All students
  getAllStudentsController: async (req, res, next) => {
    try {
      const allStudents = await userServices.allStudentsService();

      if (allStudents?.error) {
        return sendError(res, 400, allStudents?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all students successfully",
        data: {
          allStudents,
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
  postAddUserController: async (req, res, next) => {
    try {
      const user = await userServices.addUserService(req.body);

      if (user?.error) {
        return sendError(res, 400, user?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "User created successfully",
        data: {
          user,
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
  postEditUserController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const user = await userServices.editUserService(req.body, id);

      if (user?.error) {
        return sendError(res, 400, user?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Edited user successfully",
        data: {
          user,
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
  postDeleteUserController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const user = await userServices.deleteUserService(id);

      if (user?.error) {
        return sendError(res, 400, user?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted user successfully",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // One user tests
  getOneUserTestsService: async (req, res, next) => {
    try {
      const { id } = req.query;
      const test = await userServices.oneUserTestsService(id);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched user tests successfully",
        data: {
          test,
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

  // Leaderboard
  getLeaderboardController: async (req, res, next) => {
    try {
      const leaderboard = await userServices.getLeaderboardService();

      if (leaderboard?.error) {
        return sendError(res, 400, leaderboard?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched leaderboard successfully",
        data: {
          leaderboard,
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

  // Clear Leaderboard
  getClearLeaderboardController: async (req, res, next) => {
    try {
      const result = await userServices.clearLeaderboardService();

      if (result?.error) {
        return sendError(res, 400, result?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: result.message,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Get user leaderboard position
  getUserPositionController: async (req, res) => {
    try {
      const { userId } = req.query; // User ID from query params

      // Call service function
      const result = await userServices.getUserLeaderboardPositionService(
        userId
      );

      // Handle error
      if (result?.error) {
        return res.status(400).send({
          success: false,
          message: result.error,
        });
      }

      // Respond with user's position
      return res.status(200).send({
        success: true,
        message: "Fetched user's leaderboard position successfully",
        data: {
          position: result.position,
          totalUsers: result.totalUsers,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errorMessage: err.message,
      });
    }
  },
};
