const coinRepository = require("../repository/coinRepository");

class CoinService {
  async getUserCoins(userId) {
    const wallet =
      await coinRepository.getUserWallet(userId);

    return wallet?.balance || 0;
  }

  async addCoins(userId, amount) {
    if (amount <= 0) {
      throw new Error(
        "Amount must be positive"
      );
    }

    return coinRepository.addCoins(
      userId,
      amount
    );
  }

  async deductCoins(userId, amount) {
    const balance =
      await this.getUserCoins(userId);

    if (balance < amount) {
      throw new Error(
        "Insufficient coin balance"
      );
    }

    return coinRepository.deductCoins(
      userId,
      amount
    );
  }

  async rewardPomodoroCoins(userId) {
    return this.addCoins(userId, 20);
  }

  async rewardHydrationCoins(userId) {
    return this.addCoins(userId, 10);
  }
}

module.exports = new CoinService();
