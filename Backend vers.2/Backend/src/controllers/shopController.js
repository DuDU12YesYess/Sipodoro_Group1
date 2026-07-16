const shopService = require("../services/shopService");

const buySeed = async (req, res,next) => {
    try {
        const userId = req.user.user_id;
        const { seedId, quantity } = req.body;

        const result = await shopService.buySeed(
            userId,
            seedId,
            quantity
        );

        return res.status(201).json(result);

    } catch (error) {
        next(error)
    }
};

module.exports = {
    buySeed
};