const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Sipodoro API is running'
    });
});

// Import Routes
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const hydrationRoutes = require('./routes/hydrationRoutes');
// const pomodoroRoutes = require('./routes/pomodoroRoutes');
// const shopRoutes = require('./routes/shopRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/hydration', hydrationRoutes);
// app.use('/api/pomodoro', pomodoroRoutes);
// app.use('/api/shop', shopRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});