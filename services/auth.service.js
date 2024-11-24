// Models
const User = require("../models/user.model");

// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// Middlewares
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validate");
const sendMail = require("../utils/mailer.util");

// Templates
const emailVerifyMail = require("../templates/emailVerifyMail.templates");
const resetPasswordMail = require("../templates/resetPasswordMail.templates");

const client_base_url = process.env.CLIENT_BASE_URL;

// SIGNUP
exports.signupService = async (details) => {
  console.log("🚀 ~ exports.signupService= ~ details:", details);
  try {
    // Run Hapi/Joi validation
    // const { error } = await registerValidation.validateAsync(details);
    // if (error) return res.status(400).send(error.details[0].message);

    // check for user
    if (details.email) {
      //   check if email exist
      const emailExists = await User.findOne({ email: details.email });
      if (emailExists) {
        return { error: new Error("Error: Email exists") };
      }
    }

    //   Hash password
    const hashedPassword = await bcrypt.hash(details.password, 12);

    const alphabets = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const rand = Math.floor(Math.random() * 48);
    const rand2 = Math.floor(Math.random() * 48);
    const rand3 = Math.floor(Math.random() * 48);
    const rand4 = Math.floor(Math.random() * 48);

    const time = moment().format("yy-MM-DD hh:mm:ss");
    const ref = time.replace(/[\-]|[\s]|[\:]/g, "");

    emailVerificationToken = `${alphabets[rand]}${alphabets[rand3]}${alphabets[rand2]}_${ref}${rand4}`;

    // create user
    const user = new User({
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      password: hashedPassword,
      phoneNumber: details.phoneNumber,
      emailVerificationToken,
    });
    // await user.save();

    // Skip email verification
    user.emailVerificationToken = "verified";
    user.verifiedEmail = true;
    await user.save();

    console.log("🚀 ~ exports.signupService= ~ user:", user);

    // Send email
    const mailOptions = {
      to: user.email,
      subject: "Email verification mail",
      html: emailVerifyMail(
        user._id,
        user.firstName,
        emailVerificationToken,
        client_base_url
      ),
    };

    // sendMail(mailOptions);

    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// verify email
exports.verifyEmailService = async ({ id, emailToken }) => {
  console.log("🚀 ~ exports.verifyEmailService= ~ emailToken:", emailToken);
  console.log("🚀 ~ exports.verifyEmailService= ~ id:", id);
  //   check if user exist
  const user = await User.findOne({ _id: id });
  console.log("🚀 ~ user:", user);
  if (!user) {
    return { error: new Error("Error: User not found") };
  }

  // verify token
  if (user.emailVerificationToken === emailToken) {
    user.emailVerificationToken = "verified";
    user.verifiedEmail = true;
    await user.save();

    return user;
  } else {
    return { error: new Error("Error:Email Verification failed") };
  }
};

// LOGIN
exports.loginService = async (details) => {
  try {
    const { email, password } = details;

    if (email) {
      //   check if user exist
      const user = await User.findOne({ email: email });
      if (!user) {
        return { error: new Error("Error: User not found.") };
      }

      // check if email is verified
      if (!user.verifiedEmail) {
        return { error: new Error("Error: Email not verified") };
      }

      // validate password
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword)
        return { error: new Error("Error: Invalid credentials") };

      //   Generate JWT Token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      return {
        user,
        token,
      };
    }

    return { error: new Error("Error: Something went wrong.") };
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Forgot Password
exports.forgotPasswordService = async ({ email }) => {
  try {
    //   check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        error: new Error("Error: This email is not linked to an account"),
      };
    }

    const resetToken = uuidv4();
    const expire = moment().add(15, "minutes").format("YYYY-MM-DD hh:mm:ss");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expire;

    await user.save();
    console.log("user`: ", user);

    // Send email
    const mailOptions = {
      to: user.email,
      subject: "Password Reset Mail",
      html: resetPasswordMail(
        user._id,
        user.firstName,
        resetToken,
        client_base_url
      ),
    };

    sendMail(mailOptions);
    return true;
  } catch (error) {
    return { error: new Error("Error: Forgot password error") };
  }
};

// Reset Password
exports.resetPasswordService = async ({
  newPassword,
  confirmPassword,
  id,
  resetToken,
}) => {
  try {
    //   check if user exist
    const user = await User.findOne({ _id: id });

    if (!user) {
      return { error: new Error("Error: User not found") };
    }

    // Check if password matches
    if (newPassword !== confirmPassword) {
      return { error: new Error("Error: Password does not match") };
    }

    // Check token
    if (resetToken !== user.resetPasswordToken) {
      return { error: new Error("Error: E43, token parse error") };
    }

    // initiate time to check if token is still valid
    const t = moment().format("YYYY-MM-DD hh:mm:ss");

    //   Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return user;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: new Error("Error: Reset password error") };
  }
};

exports.changePasswordService = async ({
  userId,
  oldPassword,
  newPassword,
  confirmPassword,
}) => {
  try {
    //   check if user exist
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }

    // validate password
    const validatePassword = await bcrypt.compare(oldPassword, user.password);
    if (!validatePassword) {
      return {
        error: new Error(
          "Error: Previous password does not match, can't perform operation."
        ),
      };
    }

    // Check if password matches
    if (newPassword !== confirmPassword) {
      return { error: new Error("Error: Password does not match") };
    }

    //   Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    return user;
  } catch (error) {
    return { error: new Error("Error: Change password error") };
  }
};

// exports.logoutService = async (details) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return {
//           error: new Error(`Error:
//         ${err}`),
//         };
//       } else {
//         return "Logout successful";
//         // res.redirect("/login"); // Redirect to the login page after logout
//       }
//     });
//   } catch (error) {
//     return { error: new Error(error) };
//   }
// };
