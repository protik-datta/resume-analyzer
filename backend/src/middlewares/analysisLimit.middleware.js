const handleDailyLimit = require("../utils/dailyLimit");

const analysisLimit = async (req, res, next) => {
  try {
    const user = req.user;

    const limit =
      user.plan === "paid"
        ? process.env.PAID_PLAN_LIMIT
        : process.env.FREE_PLAN_LIMIT;

    const result = handleDailyLimit(user, limit);

    if (!result.allowed) {
      return res.status(403).json({
        success: false,
        message: result.message,
      });
    }

    await user.save();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { analysisLimit };
