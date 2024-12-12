// servcies
const testServices = require("../services/test.service");

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
  getAllTestsController: async (req, res, next) => {
    try {
      const allTests = await testServices.allTestsService();

      if (allTests?.error) {
        return sendError(res, 400, allTests?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all tests successfully",
        data: {
          allTests,
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
  getOneTestController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const test = await testServices.oneTestService(id);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched test successfully",
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

  // Add
  postAddTestController: async (req, res, next) => {
    try {
      const { levelId, userId } = req.query;
      const test = await testServices.addTestService(levelId, userId);

      // const { levelId } = req.query;
      // const test = await testServices.addTestService(levelId, req.user._id);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Test created successfully",
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

  // Answer Question
  postAnswerTestController: async (req, res, next) => {
    try {
      console.log("🚀 ~ postAnswerTestController: ~ req.query:", req.query);
      console.log("🚀 ~ postAnswerTestController: ~ req.body:", req.body);
      const { testId, answerId, index, questionId } = req.query;

      const { answer } = req.body;

      const test = await testServices.answerTestService(
        testId,
        questionId,
        answer,
        // answerId,
        index
      );
      console.log("🚀 ~ postAnswerTestController: ~ test:", test);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Attempted question successfully",
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

  // End
  postEndTestController: async (req, res, next) => {
    try {
      const { testId } = req.query;
      const test = await testServices.endTestService(testId);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Ended test successfully",
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

  //   Delete
  postDeleteTestController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const test = await testServices.deleteTestService(id);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted test successfully",
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
  getAllTestsByLevelController: async (req, res, next) => {
    try {
      const { levelId } = req.query;

      const allTests = await testServices.allTestsByLevelService(levelId);

      if (allTests?.error) {
        return sendError(res, 400, allTests?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all tests successfully",
        data: {
          allTests,
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

  // **** Challenges **** //
  // Add
  gettAddChallengeController: async (req, res, next) => {
    try {
      const { userId } = req.query;
      const test = await testServices.addChallengeService(userId);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Challenge created successfully",
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

  // Get Challenge by ID
  getChallengeByIdController: async (req, res, next) => {
    try {
      const { challengeId } = req.query;

      // Validate input
      if (!challengeId) {
        return res.status(400).send({
          success: false,
          message: "Challenge ID is required",
        });
      }

      // Fetch the challenge using the service
      const challenge = await testServices.findChallengeByIdService(
        challengeId
      );

      // Handle errors from the service
      if (challenge?.error) {
        return sendError(res, 404, challenge?.error?.message);
      }

      // Return success response
      return res.status(200).send({
        success: true,
        message: "Challenge retrieved successfully",
        data: {
          challenge,
        },
      });
    } catch (err) {
      // Handle unexpected errors
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // End
  postEndChallengeController: async (req, res, next) => {
    try {
      // const { challengeId } = req.query;
      const { challenge } = req.body;
      const test = await testServices.endChallengeService(
        // challengeId,
        challenge
      );

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Ended challeange successfully",
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
};
