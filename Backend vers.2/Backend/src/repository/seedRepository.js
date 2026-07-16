const {Seed} = require("../models");

const getAllSeeds = async()=>{
    return await Seed.findAll();
};

const createSeed = async(seedData)=>{
    return await Seed.create(seedData);
};

const updateSeed = async(seedId, seedData)=>{
    await Seed.update(
        seedData,
        {
            where:{
                seed_id:seedId
            }
        }
    );

    return await Seed.findByPk(seedId);
};

const deleteSeed = async(seedId)=>{
    return await Seed.destroy({
        where:{
            seed_id:seedId
        }
    });
};

module.exports={
    getAllSeeds,
    createSeed,
    updateSeed,
    deleteSeed
};