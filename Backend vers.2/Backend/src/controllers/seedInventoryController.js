const seedInventoryService = require("../services/seedInventoryService");

const getInventory = async (req, res,next) => {
    try {
        const userId = req.user.user_id;
        const inventory = await seedInventoryService.getInventory(userId);
        return res.status(200).json(inventory);

    } catch (error) {
        next(error)
    }
};

const getSeed = async (req, res,next) => {
    try {
        const userId = req.user.user_id;
        const { seedId } = req.params;

        const seed = await seedInventoryService.getSeed(userId, seedId);

        return res.status(200).json(seed);

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getInventory,
    getSeed
};