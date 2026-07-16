const coinService = require ('../services/coinService')

const getWallet = async (req, res,next)=>{
    try{
        console.log(req.user);
        console.log("User ID:", req.user.user_id);
        const userId = req.user.user_id
        const wallet = await coinService.getWallet(userId)
        return res.status(200).json(wallet)
    }catch (error){
        next(error)
    }
}

const getTransactions = async (req,res,next)=>{
    try{
        const userId = req.user.user_id
        const transactions = await coinService.getTransactions(userId)
        return res.status(200).json(transactions)

    }catch (error){
        next(error)

    }
}

module.exports = {
    getWallet,
    getTransactions
}