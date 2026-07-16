const flowerRepository = require ('../repository/flowerRepository')
const seedRepository = require ('../repository/seedRepository')
const seedInventoryService = require("../services/seedInventoryService");
const inventoryRepository = require("../repository/seedInventoryRepository");

const getCurrentFlower = async (userId)=>{
    return await flowerRepository.getCurrentFlower(userId)
}

const plantSeed = async (userId,seedId)=>{
    const existingFlower = await flowerRepository.getCurrentFlower(userId)
    //check user inventory 
    const inventory = await seedInventoryService.getSeed(userId, seedId);
    if (!inventory){
        const error = new Error('You have no seed in your inventory.')
        error.status = 404
        throw error
    }
    if (existingFlower && existingFlower.status!=="Bloomed") {
        const error = new Error('You already have a growing flower!')
        error.status = 400
        throw error
    }
    if (existingFlower && existingFlower.status === "Bloomed") {
        await flowerRepository.deleteFlower(existingFlower.flower_id);
    }

    const existingSeed = await seedRepository.getSeedById(seedId)

    if (!existingSeed){
        const error = new Error('Seed not found')
        error.status = 404
        throw error
    }
    
    await inventoryRepository.useSeed(userId, seedId);
    return await flowerRepository.createFlower({
        user_id :userId,
        seed_id: seedId,
        growth_stage: 1,
        status: 'Sprout',
        date_planted: new Date()
    })

}

const growFlower = async (userId)=>{
    const currentFlower = await flowerRepository.getCurrentFlower(userId)
    // already bloomed

    if (!currentFlower){
        return null

    }
    if (currentFlower.status === 'Bloomed') {
    return currentFlower;
    }
    const seed = await seedRepository.getSeedById(currentFlower.seed_id)
    if(!seed){
        const error = new Error('Seed not found')
        error.status = 404
        throw error
    }

    const newGrowthStage = currentFlower.growth_stage+1

    if (newGrowthStage >= seed.growth_required){
        return await flowerRepository.updateFlower(currentFlower.flower_id,{
            growth_stage: newGrowthStage,
            status : 'Bloomed',
            date_bloomed : new Date()
        })
    }
    return await flowerRepository.updateFlower(currentFlower.flower_id, {
        growth_stage: newGrowthStage,
        status : 'Bud'
    })
}
const deleteFlower = async (flowerId, userId)=>{
    const flower = await flowerRepository.getFlowerById(flowerId)

    if (!flower){
        const error = new Error('Flower not found')
        error.status = 404
        throw error
    }
    if (flower.user_id !== userId){
        const error = new Error('nauthorized')
        error.status = 401
        throw error
    }

    return await flowerRepository.deleteFlower(flowerId)
}

module.exports={
    getCurrentFlower,
    plantSeed,
    growFlower,
    deleteFlower
}