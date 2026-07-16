const gardenRepository = require("../repository/gardenRepository")
const flowerRepository = require("../repository/flowerRepository")
const seedRepository = require("../repository/seedRepository")

const getGarden=async (userId)=>{
    const garden=await gardenRepository.getGarden(userId);

    if (!garden) {
        const error = new Error('Garden not found')
        error.status = 404
        throw error
    }

    return await gardenRepository.getGardenFlowers(garden.garden_id);
};

const addFlowerToGarden=async(userId)=>{

    //get current flower in pot
    const flower = await flowerRepository.getCurrentFlower(userId);
    if (!flower) {
        const error = new Error('No flower planted')
        error.status = 404
        throw error
    }

    //flower must be bloomed
    if (flower.status !== "Bloomed") {
        const error = new Error('Flower is not fully bloomed yet')
        error.status = 401
        throw error
    }

    //get user's garden
    const garden = await gardenRepository.getGarden(userId);

    if (!garden) {
        const error = new Error('Garden not found')
        error.status = 404
        throw error
    }

    //add flower to garden
    await gardenRepository.addFlower(
        garden.garden_id,
        flower.seed_id
    );

    //remove flower from pot
    await flowerRepository.deleteFlower(
        flower.flower_id
    );

    //return updated garden
    return await gardenRepository.getGardenFlowers(
        garden.garden_id
    );

};

const addRewardFlower = async (userId) => {
    const garden = await gardenRepository.getGarden(userId);
    if (!garden) {
        const error = new Error('Garden not found')
        error.status = 404
        throw error
    }
    const seeds = await seedRepository.getAllSeeds();

    if (!seeds.length) {
        const error = new Error('No seeds available')
        error.status = 404
        throw error
    }

    const randomSeed =seeds[Math.floor(Math.random()*seeds.length)];

    return await gardenRepository.addFlower(
        garden.garden_id,
        randomSeed.seed_id
    );
};

module.exports = {
    getGarden,
    addFlowerToGarden,
    addRewardFlower
};