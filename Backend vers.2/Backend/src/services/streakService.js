const streakRepository = require("../repository/streakRepository");
const gardenService = require("./gardenService");

const REWARD_INTERVAL = 5;

const updateStreak = async (userId) => {
    const streak = await streakRepository.getStreak(userId);

    if (!streak) {
        const error = new Error('Streak record not found')
        error.status = 404
        throw error
    }

    const currentStreak = streak.current_streak + 1;

    const updatedStreak = await streakRepository.updateStreak(userId, {
        current_streak: currentStreak,
        longest_streak: Math.max(
            currentStreak,
            streak.longest_streak
        ),
        last_completed_date: new Date()
    });

    if (currentStreak % REWARD_INTERVAL === 0) {
        await gardenService.addRewardFlower(userId)
    }

    return updatedStreak;
};

const getStreak = async (userId) => {
    const streak = await streakRepository.getStreak(userId);

    if (!streak) {
        const error = new Error('Streak record not found')
        error.status = 404
        throw error
    }

    return streak;
};

module.exports = {
    updateStreak,
    getStreak
};