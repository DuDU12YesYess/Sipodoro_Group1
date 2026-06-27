const gardenRepository = require(
  "../repositories/gardenRepository"
);

const seedRepository = require(
  "../repositories/seedRepository"
);

const coinService = require("./coinService");

class GardenService {
  async plantSeed(userId, seedId) {
    try {
      const seed =
        await seedRepository.getSeedById(seedId);

      if (!seed) {
        throw new Error("Seed not found");
      }

      return await gardenRepository.createPlant({
        plantName: seed.seedName,
        growthLevel: 0,
        seedId,
        userId,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserGarden(userId) {
    return gardenRepository.getPlantsByUser(
      userId
    );
  }

  async waterPlant(plantId) {
    try {
      const plant =
        await gardenRepository.getPlantById(
          plantId
        );

      if (!plant) {
        throw new Error("Plant not found");
      }

      const growth =
        plant.growthLevel + 5;

      return gardenRepository.updateGrowthLevel(
        plantId,
        growth
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async growPlant(plantId) {
    try {
      const plant =
        await gardenRepository.getPlantById(
          plantId
        );

      if (!plant) {
        throw new Error("Plant not found");
      }

      return gardenRepository.updateGrowthLevel(
        plantId,
        plant.growthLevel + 10
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async harvestPlant(plantId) {
    try {
      const plant =
        await gardenRepository.getPlantById(
          plantId
        );

      if (!plant) {
        throw new Error("Plant not found");
      }

      if (plant.growthLevel < 100) {
        throw new Error(
          "Plant is not fully grown"
        );
      }

      await coinService.addCoins(
        plant.userId,
        50
      );

      await gardenRepository.deletePlant(
        plantId
      );

      return {
        success: true,
        reward: 50,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removePlant(plantId) {
    return gardenRepository.deletePlant(
      plantId
    );
  }
}

module.exports = new GardenService();

