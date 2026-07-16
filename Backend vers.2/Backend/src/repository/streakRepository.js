const StreakRecord = require("../models/StreakRecord");

const getStreak = async (userId) => {
    return await StreakRecord.findOne({
        where: {
            user_id: userId
        }
    });
};

const updateStreak = async (userId, updateData) => {
    await StreakRecord.update(updateData, {
        where: {
            user_id: userId
        }
    });

    return await getStreak(userId);
};

module.exports = {
    getStreak,
    updateStreak
};