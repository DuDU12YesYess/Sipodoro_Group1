const sequelize = require("../config/database");

// Import Models
const User = require("./User");
const Task = require("./Task");
const TaskCategory = require("./TaskCategory");
const PomodoroCycle = require("./PomodoroCycle");
const HydrationLog = require("./HydrationLog");
const StreakRecord = require("./StreakRecord");
const CoinWallet = require("./CoinWallet");
const CoinTransaction = require("./CoinTransaction");
const Seed = require("./Seed");
const SeedInventory = require("./SeedInventory");
const Flower = require("./Flower");
const ShopTransaction = require("./ShopTransaction");
const Garden = require("./Garden");
const GardenFlower = require("./GardenFlower");


// User -> Task
User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

// User -> PomodoroCycle
User.hasMany(PomodoroCycle, { foreignKey: "user_id" });
PomodoroCycle.belongsTo(User, { foreignKey: "user_id" });

// User -> HydrationLog
User.hasMany(HydrationLog, { foreignKey: "user_id" });
HydrationLog.belongsTo(User, { foreignKey: "user_id" });

// User -> StreakRecord (1:1)
User.hasOne(StreakRecord, { foreignKey: "user_id" });
StreakRecord.belongsTo(User, { foreignKey: "user_id" });

// User -> CoinWallet (1:1)
User.hasOne(CoinWallet, { foreignKey: "user_id" });
CoinWallet.belongsTo(User, { foreignKey: "user_id" });

// User -> CoinTransaction
User.hasMany(CoinTransaction, { foreignKey: "user_id" });
CoinTransaction.belongsTo(User, { foreignKey: "user_id" });

// User -> SeedInventory
User.hasMany(SeedInventory, { foreignKey: "user_id" });
SeedInventory.belongsTo(User, { foreignKey: "user_id" });

// User -> Flower
User.hasMany(Flower, { foreignKey: "user_id" });
Flower.belongsTo(User, { foreignKey: "user_id" });

// User -> ShopTransaction
User.hasMany(ShopTransaction, { foreignKey: "user_id" });
ShopTransaction.belongsTo(User, { foreignKey: "user_id" });

// User -> Garden (1:1)
User.hasOne(Garden, { foreignKey: "user_id" });
Garden.belongsTo(User, { foreignKey: "user_id" });



// TaskCategory -> Task
TaskCategory.hasMany(Task, { foreignKey: "category_id" });
Task.belongsTo(TaskCategory, { foreignKey: "category_id" });



// Seed -> SeedInventory
Seed.hasMany(SeedInventory, { foreignKey: "seed_id" });
SeedInventory.belongsTo(Seed, { foreignKey: "seed_id" });

// Seed -> Flower
Seed.hasMany(Flower, { foreignKey: "seed_id" });
Flower.belongsTo(Seed, { foreignKey: "seed_id" });

// Seed -> ShopTransaction
Seed.hasMany(ShopTransaction, { foreignKey: "seed_id" });
ShopTransaction.belongsTo(Seed, { foreignKey: "seed_id" });



// Garden -> GardenFlower
Garden.hasMany(GardenFlower, {
    foreignKey: "garden_id",
});

GardenFlower.belongsTo(Garden, {
    foreignKey: "garden_id",
});

// Flower -> GardenFlower
Flower.hasMany(GardenFlower, {
    foreignKey: "flower_id",
});

GardenFlower.belongsTo(Flower, {
    foreignKey: "flower_id",
});


module.exports = {
    sequelize,
    User,
    Task,
    TaskCategory,
    PomodoroCycle,
    HydrationLog,
    StreakRecord,
    CoinWallet,
    CoinTransaction,
    Seed,
    SeedInventory,
    Flower,
    ShopTransaction,
    Garden,
    GardenFlower,
};