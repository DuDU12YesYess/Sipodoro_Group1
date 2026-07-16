const { Garden, GardenFlower, Seed, sequelize } = require("../models");

const getGarden = async (userId)=>{
    return await Garden.findOne({
        where:{
            user_id: userId
        }
    });
};

const addFlower = async (gardenId, seedId)=>{
    return await GardenFlower.create({
        garden_id: gardenId,
        flower_id: seedId
    });
};

const getGardenFlowers = async(gardenId)=>{
    const [results] = await sequelize.query(`
        SELECT gf.garden_flower_id, gf.added_at, gf.flower_id AS seed_id, s.seed_name
        FROM Garden_Flower gf
        LEFT JOIN Seed s ON gf.flower_id = s.seed_id
        WHERE gf.garden_id = ${gardenId}
        ORDER BY gf.added_at DESC
    `);
    return results;
};

module.exports={
    getGarden,
    addFlower,
    getGardenFlowers
};