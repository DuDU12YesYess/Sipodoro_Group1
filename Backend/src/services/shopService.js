const seedRepository = require(
  "../repositories/seedRepository"
);

const shopRepository = require(
  "../repositories/shopRepository"
);

const coinService = require("./coinService");

class ShopService {
  async getAllSeeds() {
    return seedRepository.getAllSeeds();
  }

  async getSeedById(seedId) {
    const seed =
      await seedRepository.getSeedById(seedId);

    if (!seed) {
      throw new Error("Seed not found");
    }

    return seed;
  }

  async purchaseSeed(userId, seedId) {
    try {
      const seed =
        await seedRepository.getSeedById(seedId);

      if (!seed) {
        throw new Error("Seed not found");
      }

      const balance =
        await coinService.getUserCoins(userId);

      if (balance < seed.price) {
        throw new Error(
          "Insufficient coins"
        );
      }

      await coinService.deductCoins(
        userId,
        seed.price
      );

      await shopRepository.createPurchase({
        userId,
        seedId,
        price: seed.price,
        purchasedAt: new Date(),
      });

      const updatedBalance =
        await coinService.getUserCoins(userId);

      return {
        success: true,
        balance: updatedBalance,
        purchasedSeed: seed,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPurchaseHistory(userId) {
    return shopRepository.getPurchaseHistory(
      userId
    );
  }
}

module.exports = new ShopService();

