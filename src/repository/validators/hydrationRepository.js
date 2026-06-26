const WaterLog = require("../models/WaterLog");

class HydrationRepository {
  /**
   * Create water log
   */
  async createWaterLog(data) {
    return await WaterLog.create(data);
  }

  /**
   * Get water log by ID
   */
  async getWaterLogById(id) {
    return await WaterLog.findById(id);
  }

  /**
   * Get all logs for user
   */
  async getWaterLogsByUser(userId) {
    return await WaterLog.find({ userId })
      .sort({ date: -1 });
  }

  /**
   * Get today's logs
   */
  async getTodayWaterLogs(userId) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return await WaterLog.find({
      userId,
      date: {
        $gte: start,
        $lte: end,
      },
    });
  }

  /**
   * Calculate total water consumed
   */
  async getTotalWaterConsumed(userId) {
    const result = await WaterLog.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
    ]);

    return result.length > 0
      ? result[0].totalAmount
      : 0;
  }

  /**
   * Delete log
   */
  async deleteWaterLog(id) {
    return await WaterLog.findByIdAndDelete(id);
  }
}

module.exports = new HydrationRepository();