// servcies
const authServices = require("../services/auth.service");

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
      // return sendResponse(res, {}, 200, "Pong");
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },

  //   SignUp
  postSignupController: async (req, res, next) => {
    try {
      const signupDetails = await authServices.signupService(req.body);

      if (signupDetails?.error) {
        return sendError(res, 400, signupDetails?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "User Registered successfully",
        data: signupDetails,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //   Verify email
  getVerifyEmailController: async (req, res, next) => {
    try {
      console.log("🚀 ~ getVerifyEmailController: ~ req.query:", req.query);
      const verifyEmail = await authServices.verifyEmailService(req.query);

      if (verifyEmail?.error) {
        return sendError(res, 400, verifyEmail?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Email verified successfully",
        data: verifyEmail,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Login
  postLoginController: async (req, res, next) => {
    try {
      const loginDetails = await authServices.loginService(req.body);

      if (loginDetails?.error) {
        return sendError(res, 400, loginDetails?.error?.message);
      }

      // save to sessions
      req.session.user = loginDetails;
      req.session.isLoggedIn = true;

      return res.status(200).send({
        success: true,
        message: "Login successful",
        data: loginDetails,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Forgot Password
  postForgotPasswordController: async (req, res) => {
    try {
      const forgotPasswordDetails = await authServices.forgotPasswordService(
        req.body
      );

      if (forgotPasswordDetails?.error) {
        return sendError(res, 400, forgotPasswordDetails?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Please refer to your mail to complete this process",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Reset Password
  postResetPasswordController: async (req, res) => {
    try {
      const { id, resetToken } = req.query;
      const { newPassword, confirmPassword } = req.body;
      const resetPasswordDetails = await authServices.resetPasswordService({
        id,
        resetToken,
        newPassword,
        confirmPassword,
      });

      if (resetPasswordDetails?.error) {
        return sendError(res, 400, resetPasswordDetails?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Password reset was successful.",
        data: resetPasswordDetails,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Change Password
  postChangePasswordController: async (req, res) => {
    try {
      const { userId } = req.query;
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const changePasswordDetails = await authServices.changePasswordService({
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (changePasswordDetails?.error) {
        return sendError(res, 400, changePasswordDetails?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Password was changed successfully.",
        data: changePasswordDetails,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  postLogoutController: async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return sendError(res, 500, err.message);
        } else {
          return res.status(200).send({
            success: true,
            message: "Logout successful",
          });
        }
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
