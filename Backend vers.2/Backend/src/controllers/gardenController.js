const gardenService = require("../services/gardenService");

const getGarden = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const flowers = await gardenService.getGarden(userId);

        return res.status(200).json(flowers);
    } catch (error) {
        next(error)
    }
};

const addFlowerToGarden = async (req, res,next) => {
    try {
        const userId = req.user.user_id;

        const garden = await gardenService.addFlowerToGarden(userId);

        return res.status(200).json({
            message: "Flower added to garden successfully.",
            garden
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getGarden,
    addFlowerToGarden
};