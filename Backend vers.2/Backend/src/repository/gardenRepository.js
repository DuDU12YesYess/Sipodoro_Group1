const { Garden, GardenFlower, Seed } = require("../models");

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
        seed_id: seedId
    });
};

const getGardenFlowers = async(gardenId)=>{
    return await GardenFlower.findAll({
        where:{
            garden_id: gardenId
        },
        include:[
            {
                model: Seed,
                attributes: [
                    "seed_name"
                ]
            }
        ],
        order: [["added_at", "DESC"]]
    });
};

module.exports={
    getGarden,
    addFlower,
    getGardenFlowers
};