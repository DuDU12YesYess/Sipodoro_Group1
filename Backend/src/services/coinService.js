const coinRepository = require("../repositories/coinRepository");

class CoinService {
  
  //Get user's current coin balance
  async getUserCoins(userId) {
    try {
      const wallet =
        await coinRepository.getUserWallet(userId);

      if (!wallet) {
        return 0;
      }

      return wallet.balance;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
  //Add coins
  async addCoins(userId, amount) {
    try {
      if (amount <= 0) {
        throw new Error(
          "Coin amount must be greater than zero"
        );
      }

      return await coinRepository.addCoins(
        userId,
        amount
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Deduct coins
  async deductCoins(userId, amount) {
    try {
      if (amount <= 0) {
        throw new Error(
          "Coin amount must be greater than zero"
        );
      }

      const currentBalance =
        await this.getUserCoins(userId);

      if (currentBalance < amount) {
        throw new Error(
          "Insufficient coin balance"
        );
      }

      return await coinRepository.deductCoins(
        userId,
        amount
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Reward after Pomodoro completion
  async rewardPomodoroCoins(userId) {
    try {
      const reward = 20;

      await this.addCoins(userId, reward);

      return {
        reward,
        message:
          "Pomodoro reward granted successfully",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
  //Reward after hydration goal achieved
  async rewardHydrationCoins(userId) {
    try {
      const reward = 10;

      await this.addCoins(userId, reward);

      return {
        reward,
        message:
          "Hydration reward granted successfully",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new CoinService();
