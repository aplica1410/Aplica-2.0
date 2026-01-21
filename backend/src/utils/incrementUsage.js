const UsageCounter = require('../models/UsageCounter');

const incrementUsage = async (userId) => {
  const today = new Date().toISOString().split('T')[0];

  await UsageCounter.updateOne(
    { userId, date: today },
    {
      $inc: {
        dailyCount: 1,
        monthlyCount: 1
      }
    },
    { upsert: true }
  );
};

module.exports = incrementUsage;
