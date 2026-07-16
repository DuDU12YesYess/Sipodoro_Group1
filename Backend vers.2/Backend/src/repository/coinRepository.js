const {CoinWallet,CoinTransaction} = require('../models')

const getWallet = async (userId)=>{
    return await CoinWallet.findOne({
        where: {
            user_id: userId
        }
    })
}

const updateWallet = async (userId, totalCoins)=>{
    await CoinWallet.update({
        total_coins: totalCoins
    },
    {
        where: {
        user_id: userId
        }
    }

    )
    return await getWallet(userId)

}

const createTransaction = async (userId, amount)=>{
    return CoinTransaction.create({
            user_id: userId,
            amount
    })
}

const getTransactions = async (userId)=>{
    return await CoinTransaction.findAll({
        where: {
            user_id: userId
        },
        order : [["created_at", "DESC"]]
    })
}

module.exports = {
    getWallet,
    updateWallet,
    createTransaction,
    getTransactions
}