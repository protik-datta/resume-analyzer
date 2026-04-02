const isSameDay = (d1, d2) => {
  return d1.toDateString() === d2.toDateString();
};

const handleDailyLimit = (user, limit = process.env.FREE_PLAN_LIMIT) => {
  const today = new Date();

  if (!user.lastAnalysisDate || !isSameDay(today, user.lastAnalysisDate)) {
    user.dailyAnalysisCount = 0;
    user.lastAnalysisDate = today;
  }

  if (user.dailyAnalysisCount >= limit) {
    return {
      allowed: false,
      message: "Daily limit reached (5 analyses per day)",
    };
  }

  user.dailyAnalysisCount += 1;

  return { allowed: true };
};

module.exports = handleDailyLimit;
