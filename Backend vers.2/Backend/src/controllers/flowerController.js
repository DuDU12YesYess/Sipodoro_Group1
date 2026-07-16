const { error } = require('node:console')
const flowerService = require ('../services/flowerService')

const getCurrentFlower = async (req, res,next)=>{
    try{
        const userId = req.user.user_id
        const flower = await flowerService.getCurrentFlower(userId)
        return res.status(200).json(flower)

    }catch(error){
        next(error)

    }
}

const plantSeed = async (req, res,next)=>{
    try{
        const userId = req.user.user_id
        const {seed_id} = req.body

        const flower = await flowerService.plantSeed(
            userId,
            seed_id
        )
        return res.status(201).json(flower)

    }catch (error){
        next(error)

        
    }
}

const deleteFlower = async (req, res)=>{
    try{
        const userId = req.user.user_id
        const {id: flowerId} = req.params

        await flowerService.deleteFlower(
            flowerId,
            userId
        )
        return res.status(200).json({
            message: 'Flower removed successfully'
        })

    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

const storeInInventory = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const result = await flowerService.storeInInventory(userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message });
    }
};

module.exports={
    getCurrentFlower,
    plantSeed,
    deleteFlower,
    storeInInventory
}

