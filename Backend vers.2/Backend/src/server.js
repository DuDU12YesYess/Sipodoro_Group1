const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

// Import your routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const pomodoroRoutes = require('./routes/pomodoroRoutes');
const hydrationRoutes = require('./routes/hydrationRoutes');
const coinRoutes = require('./routes/coinRoutes');
const flowerRoutes = require('./routes/flowerRoutes');
const gardenRoutes = require('./routes/gardenRoutes');
const shopRoutes = require('./routes/shopRoutes');
const seedInventoryRoutes = require('./routes/seedInventoryRoutes');
const streakRoutes = require('./routes/streakRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/hydration', hydrationRoutes);
app.use('/api/coins', coinRoutes);
app.use('/api/flowers', flowerRoutes);
app.use("/api/garden", gardenRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/inventory", seedInventoryRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling (Must be last)
app.use(errorHandler);

// Database connection
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        const PORT = process.env.PORT;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
    }
}

startServer();