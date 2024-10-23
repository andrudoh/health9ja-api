// Import Routes
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const levelRouter = require("./level.route");
const questionRouter = require("./question.route");
const topicRouter = require("./topic.route");
const answerRouter = require("./answer.route");
const testRouter = require("./test.route");
const userRouter = require("./user.route");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/levels", levelRouter);
  app.use("/api/questions", questionRouter);
  app.use("/api/topics", topicRouter);
  app.use("/api/answers", answerRouter);
  app.use("/api/tests", testRouter);
  app.use("/api/users", userRouter);
};
