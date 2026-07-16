const SeedInventory = require("../models/SeedInventory");

const getInventory = async (userId) => {
    return await SeedInventory.findAll({
        where: {
            user_id: userId
        }
    });
};

const findByUserAndSeed = async (userId, seedId) => {
    return await SeedInventory.findOne({
        where: {
            user_id: userId,
            seed_id: seedId
        }
    });
};

const create = async (inventoryData) => {
    return await SeedInventory.create(inventoryData);
};

const updateQuantity = async (userId, seedId, quantity) => {
    await SeedInventory.update(
        { quantity },
        {
            where: {
                user_id: userId,
                seed_id: seedId
            }
        }
    );

    return await findByUserAndSeed(userId, seedId);
};

const useSeed = async (userId, seedId) => {
    const inventory = await findByUserAndSeed(userId, seedId);

    if (!inventory) {
        throw new Error("Seed not found in inventory");
    }

    if (inventory.quantity <= 0) {
        throw new Error("No seeds remaining");
    }

    inventory.quantity -= 1;
    await inventory.save();

    return inventory;
};

const returnSeed = async (userId, seedId) => {
    const inventory = await findByUserAndSeed(userId, seedId);

    if (inventory) {
        inventory.quantity += 1;
        await inventory.save();
        return inventory;
    }

    return await create({
        user_id: userId,
        seed_id: seedId,
        quantity: 1
    });
};

module.exports = {
    getInventory,
    findByUserAndSeed,
    create,
    updateQuantity,
    useSeed,
    returnSeed
};