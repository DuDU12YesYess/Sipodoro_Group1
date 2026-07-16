const seedRepository = require("../repository/seedRepository");


const getAllSeeds = async()=>{
    return await seedRepository.getAllSeeds();
};


const createSeed = async(data)=>{

    if(!data.seed_name || !data.cost){
        throw new Error("Seed name and cost required");
    }

    return await seedRepository.createSeed(data);
};


const updateSeed = async(id,data)=>{
    return await seedRepository.updateSeed(id,data);
};


const deleteSeed = async(id)=>{
    return await seedRepository.deleteSeed(id);
};


module.exports={
    getAllSeeds,
    createSeed,
    updateSeed,
    deleteSeed
};