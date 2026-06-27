const { HydrationLog } = require("../models");

/* ADD HYDRATION LOG */
exports.addHydrationLog = async (req, res) => {
  try {
    const { user_id } = req.user || req.body;

    const log = await HydrationLog.create({
      user_id,
      check_in_time: new Date(),
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET LOGS */
exports.getHydrationLogs = async (req, res) => {
  try {
    const { user_id } = req.user || req.query;

    const logs = await HydrationLog.findAll({
      where: { user_id },
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
