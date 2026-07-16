const ShopTransaction = require("../models/ShopTransaction");

const createTransaction = async (transactionData) => {
    return await ShopTransaction.create(transactionData);
};

const getTransactions = async (userId) => {
    return await ShopTransaction.findAll({
        where: {
            user_id: userId
        },
        order: [["created_at", "DESC"]]
    });
};

const getTransactionById = async (transactionId) => {
    return await ShopTransaction.findByPk(transactionId);
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById
};