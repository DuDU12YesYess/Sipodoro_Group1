const db = require('../config/database');

module.exports = db;const sequelize = require("../config/database");

const Admin = require("./Admin")(sequelize);
const User = require("./User")(sequelize);
const Task = require("./Task")(sequelize);
const TaskCategory = require("./TaskCategory")(sequelize);
const PomodoroCycle = require("./PomodoroCycle")(sequelize);
const HydrationLog = require("./HydrationLog")(sequelize);
const StreakRecord = require("./StreakRecord")(sequelize);
const CoinTransaction = require("./CoinTransaction")(sequelize);
const CoinWallet = require("./CoinWallet")(sequelize);
const Seed = require("./Seed")(sequelize);
const SeedInventory = require("./SeedInventory")(sequelize);
const Flower = require("./Flower")(sequelize);
const ShopTransaction = require("./ShopTransaction")(sequelize);
const Garden = require("./Garden")(sequelize);

/* =====================
   ADMIN RELATIONSHIPS
===================== */

Admin.hasMany(User, { foreignKey: "admin_id" });
User.belongsTo(Admin, { foreignKey: "admin_id" });

Admin.hasMany(TaskCategory, { foreignKey: "admin_id" });
TaskCategory.belongsTo(Admin, { foreignKey: "admin_id" });

Admin.hasMany(Seed, { foreignKey: "admin_id" });
Seed.belongsTo(Admin, { foreignKey: "admin_id" });

/* =====================
   USER RELATIONSHIPS
===================== */

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(PomodoroCycle, { foreignKey: "user_id" });
PomodoroCycle.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(HydrationLog, { foreignKey: "user_id" });
HydrationLog.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(StreakRecord, { foreignKey: "user_id" });
StreakRecord.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(CoinTransaction, { foreignKey: "user_id" });
CoinTransaction.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(CoinWallet, { foreignKey: "user_id" });
CoinWallet.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(SeedInventory, { foreignKey: "user_id" });
SeedInventory.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Flower, { foreignKey: "user_id" });
Flower.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(ShopTransaction, { foreignKey: "user_id" });
ShopTransaction.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Garden, { foreignKey: "user_id" });
Garden.belongsTo(User, { foreignKey: "user_id" });

/* =====================
   TASK RELATIONSHIPS
===================== */

TaskCategory.hasMany(Task, {
  foreignKey: "category_id",
});

Task.belongsTo(TaskCategory, {
  foreignKey: "category_id",
});

/* =====================
   SEED RELATIONSHIPS
===================== */

Seed.hasMany(SeedInventory, {
  foreignKey: "seed_id",
});

SeedInventory.belongsTo(Seed, {
  foreignKey: "seed_id",
});

Seed.hasMany(Flower, {
  foreignKey: "seed_id",
});

Flower.belongsTo(Seed, {
  foreignKey: "seed_id",
});

Seed.hasMany(ShopTransaction, {
  foreignKey: "seed_id",
});

ShopTransaction.belongsTo(Seed, {
  foreignKey: "seed_id",
});

module.exports = {
  sequelize,
  Admin,
  User,
  Task,
  TaskCategory,
  PomodoroCycle,
  HydrationLog,
  StreakRecord,
  CoinTransaction,
  CoinWallet,
  Seed,
  SeedInventory,
  Flower,
  ShopTransaction,
  Garden,
};