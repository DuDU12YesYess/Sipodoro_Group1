const Flower = require ('../models/Flower')

const getCurrentFlower = async (userId)=>{
    return await Flower.findOne({
        where: {
            user_id : userId
        }
    })
}

const getFlowerById = async (flowerId) => {
    return await Flower.findByPk(flowerId)
}

const createFlower = async (flowerData)=>{
    return await Flower.create(flowerData)
}

const updateFlower = async (flowerId, updateData)=>{
    await Flower.update(updateData,{
        where: {
            flower_id : flowerId
        }
    })
    return await getFlowerById(flowerId)
}

const deleteFlower = async (flowerId)=>{
    return await Flower.destroy({
        where: {
            flower_id: flowerId
        }
    })
}

module.exports = {
    getCurrentFlower,
    getFlowerById,
    createFlower,
    updateFlower,
    deleteFlower
}