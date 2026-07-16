const seedService = require("../services/seedService");


const getAllSeeds = async(req,res,next)=>{
    try{

        const seeds = await seedService.getAllSeeds();

        res.json(seeds);

    }catch(error){
        next(error);
    }
};



const createSeed = async(req,res,next)=>{
    try{

        const seed = await seedService.createSeed(req.body);

        res.status(201).json(seed);

    }catch(error){
        next(error);
    }
};



const updateSeed = async(req,res,next)=>{
    try{

        const seed = await seedService.updateSeed(
            req.params.id,
            req.body
        );

        res.json(seed);

    }catch(error){
        next(error);
    }
};



const deleteSeed = async(req,res,next)=>{
    try{

        await seedService.deleteSeed(req.params.id);

        res.json({
            message:"Seed deleted"
        });

    }catch(error){
        next(error);
    }
};


module.exports={
    getAllSeeds,
    createSeed,
    updateSeed,
    deleteSeed
};