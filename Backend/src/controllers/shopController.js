const {
  Seed,
  SeedInventory,
  ShopTransaction,
  Flower,
  CoinWallet,
} = require("../models");

/* BUY SEED */
exports.buySeed = async (req, res) => {
  try {
    const { user_id, seed_id, quantity } = req.body;

    const seed = await Seed.findByPk(seed_id);
    if (!seed) return res.status(404).json({ message: "Seed not found" });

    const totalCost = seed.cost * quantity;
    const wallet = await CoinWallet.findOne({ where: { user_id } });

    if (!wallet || wallet.total_coins < totalCost) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    wallet.total_coins -= totalCost;
    await wallet.save();

    await SeedInventory.create({
      user_id,
      seed_id,
      quantity,
    });

    const transaction = await ShopTransaction.create({
      user_id,
      seed_id,
      quantity,
      coin_spent: totalCost,
      created_at: new Date(),
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* TRANSACTION HISTORY */
exports.getTransactionHistory = async (req, res) => {
  try {
    const { user_id } = req.user || req.query;

    const history = await ShopTransaction.findAll({
      where: { user_id },
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ADD FLOWER */
exports.addFlower = async (req, res) => {
  try {
    const flower = await Flower.create(req.body);
    res.status(201).json(flower);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE FLOWER */
exports.updateFlower = async (req, res) => {
  try {
    await Flower.update(req.body, {
      where: { flower_id: req.params.id },
    });

    res.json({ message: "Flower updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE FLOWER */
exports.deleteFlower = async (req, res) => {
  try {
    await Flower.destroy({
      where: { flower_id: req.params.id },
    });

    res.json({ message: "Flower deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
