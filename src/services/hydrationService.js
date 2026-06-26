
const hydrationRepository = require(
  "../repositories/hydrationRepository"
);

const coinService = require("./coinService");

class HydrationService {
  HYDRATION_GOAL = 2000;

  async addWaterLog(userId, amount) {
    try {
      if (!amount || amount <= 0) {
        throw new Error(
          "Water amount must be greater than zero"
        );
      }

      const log =
        await hydrationRepository.createWaterLog({
          userId,
          amount,
          date: new Date(),
        });

      await this.checkHydrationGoal(userId);

      return log;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getWaterLogs(userId) {
    return hydrationRepository.getWaterLogsByUser(
      userId
    );
  }

  async getTodayWaterLogs(userId) {
    return hydrationRepository.getTodayWaterLogs(
      userId
    );
  }

  async getDailyWaterTotal(userId) {
    const logs =
      await hydrationRepository.getTodayWaterLogs(
        userId
      );

    return logs.reduce(
      (total, log) => total + log.amount,
      0
    );
  }

  async checkHydrationGoal(userId) {
    try {
      const total =
        await this.getDailyWaterTotal(userId);

      if (total >= this.HYDRATION_GOAL) {
        await coinService.rewardHydrationCoins(
          userId
        );

        return {
          achieved: true,
          reward: 10,
        };
      }

      return {
        achieved: false,
        remaining:
          this.HYDRATION_GOAL - total,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new HydrationService();
