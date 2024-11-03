const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("🚀 ~ authorize ~ roles:", roles);
    console.log("🚀 ~ return ~ req:", req.user);
    if (!roles.includes(req.user?.role)) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
    next();
  };
};

module.exports = { authorize };
