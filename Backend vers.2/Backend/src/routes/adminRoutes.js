const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const HydrationLog = require('../models/HydrationLog');
const Seed = require('../models/Seed');
const { sequelize } = require('../models/index');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

// GET all users with streak and seed info (Protected: Admin Only)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [users] = await sequelize.query(`
            SELECT 
                u.user_id AS id,
                u.username,
                u.email,
                u.role,
                COALESCE(sr.current_streak, 0) AS current_streak,
                COALESCE(sr.longest_streak, 0) AS longest_streak,
                COALESCE(SUM(si.quantity), 0) AS total_seeds
            FROM Users u
            LEFT JOIN Streak_Record sr ON sr.user_id = u.user_id
            LEFT JOIN Seed_Inventory si ON si.user_id = u.user_id
            GROUP BY u.user_id, u.username, u.email, u.role, sr.current_streak, sr.longest_streak
            ORDER BY u.user_id ASC
        `);
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error fetching users" });
    }
});

// GET all hydration logs with user info (Protected: Admin Only)
router.get('/hydration-logs', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const logs = await HydrationLog.findAll({
            include: [{
                model: User,
                attributes: ['id', 'username', 'email'],
                required: true
            }],
            order: [['check_in_time', 'DESC']]
        });
        res.json(logs);
    } catch (err) {
        console.error("Error fetching hydration logs:", err);
        res.status(500).json({ message: "Server error fetching hydration logs" });
    }
});

// GET all seeds (Protected: Admin Only)
router.get('/seeds', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const seeds = await Seed.findAll({
            attributes: ['seed_id', 'seed_name', 'cost', 'growth_required', 'image_url'],
            order: [['seed_id', 'ASC']]
        });
        res.json(seeds);
    } catch (err) {
        console.error("Error fetching seeds:", err);
        res.status(500).json({ message: "Server error fetching seeds" });
    }
});

// GET all users' gardens with flower info and seed inventory (Protected: Admin Only)
router.get('/gardens', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [gardens] = await sequelize.query(`
            SELECT 
                gf.garden_flower_id,
                gf.added_at,
                u.username,
                u.email,
                s.seed_name,
                s.cost,
                si.quantity AS seeds_owned
            FROM Garden_Flower gf
            INNER JOIN Garden g ON gf.garden_id = g.garden_id
            INNER JOIN Users u ON g.user_id = u.user_id
            LEFT JOIN Seed s ON gf.flower_id = s.seed_id
            LEFT JOIN Seed_Inventory si ON si.user_id = u.user_id AND si.seed_id = gf.flower_id
            ORDER BY gf.added_at DESC
        `);
        res.json(gardens);
    } catch (err) {
        console.error("Error fetching gardens:", err);
        res.status(500).json({ message: "Server error fetching gardens" });
    }
});

module.exports = router;