const GardenPlant = require("../models/GardenPlant");

class GardenRepository {
  /**
   * Create a new plant
   */
  async createPlant(data) {
    return await GardenPlant.create(data);
  }

  /**
   * Get plant by ID
   */
  async getPlantById(id) {
    return await GardenPlant.findById(id);
  }

  /**
   * Get all plants owned by a user
   */
  async getPlantsByUser(userId) {
    return await GardenPlant.find({ userId });
  }

  /**
   * Update plant details
   */
  async updatePlant(id, data) {
    return await GardenPlant.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
  }

  /**
   * Update growth level only
   */
  async updateGrowthLevel(id, growthLevel) {
    return await GardenPlant.findByIdAndUpdate(
      id,
      { growthLevel },
      { new: true }
    );
  }

  /**
   * Delete plant
   */
  async deletePlant(id) {
    return await GardenPlant.findByIdAndDelete(id);
  }
}

module.exports = new GardenRepository();
