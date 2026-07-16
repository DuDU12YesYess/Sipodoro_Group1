const hydrationService = require ('../services/hydrationService')

const checkIn = async (req, res,next) => {
    try {
        const userId = req.user.user_id
        const result =await hydrationService.checkInWater(userId)
        return res.status(201).json(result)

    } catch (error) {
        next(error)

    }
};

const getHistory = async (req, res,next) => {

    try {
        const userId = req.user.user_id;
        const logs=await hydrationService.getHistory(userId);
        return res.status(200).json(logs);
    } catch (error) {
        next(error)

    }

};

module.exports={
    checkIn,
    getHistory
}