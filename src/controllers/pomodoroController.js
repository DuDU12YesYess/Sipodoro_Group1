const { PomodoroCycle, StreakRecord } = require("../models");

/* START CYCLE */
exports.startCycle = async (req, res) => {
  try {
    const { user_id } = req.body;

    const cycle = await PomodoroCycle.create({
      user_id,
      start_time: new Date(),
    });

    res.status(201).json(cycle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* END CYCLE */
exports.endCycle = async (req, res) => {
  try {
    const { id } = req.params;

    const cycle = await PomodoroCycle.findByPk(id);

    if (!cycle) return res.status(404).json({ message: "Cycle not found" });

    cycle.end_time = new Date();
    cycle.completed_at = new Date();
    cycle.completed_focus_sessions += 1;

    await cycle.save();

    // update streak 
    const streak = await StreakRecord.findOne({
      where: { user_id: cycle.user_id },
    });

    if (streak) {
      streak.current_streak += 1;
      streak.longest_streak = Math.max(
        streak.longest_streak,
        streak.current_streak
      );
      streak.last_completed_cycle = new Date();
      await streak.save();
    }

    res.json(cycle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* HISTORY */
exports.getUserCycles = async (req, res) => {
  try {
    const { user_id } = req.user || req.query;

    const cycles = await PomodoroCycle.findAll({
      where: { user_id },
    });

    res.json(cycles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};