const pomodoroRepository = require(
  "../repositories/pomodoroRepository"
);

const coinService = require("./coinService");

class PomodoroService {
  async startSession(userId, duration) {
    try {
      if (!duration || duration <= 0) {
        throw new Error(
          "Duration must be greater than zero"
        );
      }

      return await pomodoroRepository.createSession({
        userId,
        duration,
        startedAt: new Date(),
        completed: false,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async completeSession(sessionId) {
    try {
      const session =
        await pomodoroRepository.getSessionById(
          sessionId
        );

      if (!session) {
        throw new Error("Session not found");
      }

      const updated =
        await pomodoroRepository.completeSession(
          sessionId
        );

      await coinService.rewardPomodoroCoins(
        session.userId
      );

      return updated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserSessions(userId) {
    return pomodoroRepository.getUserSessions(
      userId
    );
  }

  async getCompletedSessions(userId) {
    return pomodoroRepository.getCompletedSessions(
      userId
    );
  }

  async getTotalFocusTime(userId) {
    try {
      const sessions =
        await pomodoroRepository.getCompletedSessions(
          userId
        );

      return sessions.reduce(
        (sum, session) =>
          sum + session.duration,
        0
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new PomodoroService();

