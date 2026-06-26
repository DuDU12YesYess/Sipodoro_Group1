const Seed = require("../models/Seed");

class SeedRepository {
  /**
   * Create seed
   */
  async createSeed(data) {
    return await Seed.create(data);
  }

  /**
   * Get seed by ID
   */
  async getSeedById(id) {
    return await Seed.findById(id);
  }

  /**
   * Get all seeds
   */
  async getAllSeeds() {
    return await Seed.find()
      .sort({ seedName: 1 });
  }

  /**
   * Update seed
   */
  async updateSeed(id, data) {
    return await Seed.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Delete seed
   */
  async deleteSeed(id) {
    return await Seed.findByIdAndDelete(id);
  }
}

module.exports = new SeedRepository();