const seedRepository = require("../repository/seedRepository");
const seedInventoryRepository = require("../repository/seedInventoryRepository");
const shopRepository = require("../repository/shopRepository");
const coinService = require("./coinService");

const buySeed = async (userId, seedId, quantity = 1) => {
    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        const error = new Error('Quantity must be greater than 0.')
        error.status = 401
        throw error
    }

    // Find seed
    const seed = await seedRepository.getSeedById(seedId);

    if (!seed) {
        const error = new Error('Seed not found.')
        error.status = 404
        throw error
    }

    // Calculate total price
    const totalPrice = seed.cost * quantity;

    // Deduct coins (CoinWallet + CoinTransaction)
    await coinService.spendCoin(userId, totalPrice);

    // Check if user already owns this seed
    const inventory = await seedInventoryRepository.findByUserAndSeed(
        userId,
        seedId
    );

    if (inventory) {
        await seedInventoryRepository.updateQuantity(
            userId,
            seedId,
            inventory.quantity + quantity
        );
    } else {
        await seedInventoryRepository.create({
            user_id: userId,
            seed_id: seedId,
            quantity
        });
    }

    return {
        message: "Seed purchased successfully.",
        data: {
            seed_id: seed.seed_id,
            seed_name: seed.seed_name,
            quantity,
            total_price: totalPrice
        }
    };
};

module.exports = {
    buySeed
};