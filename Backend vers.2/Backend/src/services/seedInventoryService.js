const seedInventoryRepository = require("../repository/seedInventoryRepository");

const getInventory = async (userId) => {
    return await seedInventoryRepository.getInventory(userId);
};

const getSeed = async (userId, seedId) => {
    const seed = await seedInventoryRepository.findByUserAndSeed(userId, seedId);

    if (!seed) {
        const error = new Error('Seed not found in inventory')
        error.status = 404
        throw error
    }

    return seed;
};

const useSeed = async (userId, seedId) => {
    const seed = await seedInventoryRepository.findByUserAndSeed(userId, seedId);

    if (!seed) {
        const error = new Error('Seed not found in inventory')
        error.status = 404
        throw error
    }

    if (seed.quantity <= 0) {
        const error = new Error('No seeds remaining')
        error.status = 404
        throw error
    }

    return await seedInventoryRepository.useSeed(userId, seedId);
};

module.exports = {
    getInventory,
    getSeed,
    useSeed
};