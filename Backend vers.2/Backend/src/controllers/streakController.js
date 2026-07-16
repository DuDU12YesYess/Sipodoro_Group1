const streakService = require("../services/streakService");

const getStreak = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const streak = await streakService.getStreak(userId);

        return res.status(200).json(streak);

    } catch (error) {

        return res.status(404).json({
            message: error.message
        });

    }
};

module.exports = {
    getStreak
};