const {
    User,
    Task,
    Seed,
    Flower,
    Garden,
    CoinWallet,
    HydrationLog,
    PomodoroCycle
}=require("../models");

// Get all database data
const getAllData = async()=>{
    const data={};

    data.users = await User.findAll();

    data.tasks = await Task.findAll();

    data.seeds = await Seed.findAll();

    data.flowers = await Flower.findAll();

    data.gardens = await Garden.findAll();

    data.coinWallets = await CoinWallet.findAll();

    data.hydrationLogs = await HydrationLog.findAll();

    data.pomodoroCycles = await PomodoroCycle.findAll();

    return data;
};

module.exports={
    getAllData
};
