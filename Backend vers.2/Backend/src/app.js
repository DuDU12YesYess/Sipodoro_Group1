const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler")

app.use(cors());
app.use(express.json());

// test route to confirm app is running
app.get('/', (req, res) => res.json({ message: 'Sipodoro backend running!' }));

// Import routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require ("./routes/userRoutes")
const taskRoutes = require ('./routes/taskRoutes')
const pomodoroRoutes = require ('./routes/pomodoroRoutes')
const hydrationRoutes = require ('./routes/hydrationRoutes')
const coinRoutes = require ('./routes/coinRoutes')
const flowerRoutes = require ('./routes/flowerRoutes')
const gardenRoutes = require("./routes/gardenRoutes")
const shopRoutes = require ("./routes/shopRoutes")
const seedInventoryRoutes = require("./routes/seedInventoryRoutes")
const streakRoutes = require("./routes/streakRoutes")
const adminRoutes = require("./routes/adminRoutes")
// const backupRoutes = require("./routes/backupRoutes");

// Use routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/pomodoro', pomodoroRoutes)
app.use('/api/hydration',hydrationRoutes)
app.use('/api/coins',coinRoutes)
app.use('/api/flowers',flowerRoutes)
app.use("/api/garden", gardenRoutes)
app.use("/api/shop", shopRoutes)
app.use("/api/inventory", seedInventoryRoutes)
app.use("/api/streak", streakRoutes)
app.use("/api/admin", adminRoutes)
// app.use("/api/backup",backupRoutes);

//error handler
app.use(errorHandler)

module.exports = app;
