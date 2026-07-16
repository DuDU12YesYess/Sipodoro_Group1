const {User, StreakRecord, Garden, CoinWallet}= require ('../models');

const findByEmail = async (email)=> {
    return await User.findOne({
        where: {email}
    });
};

const findByEmailOrUsername = async (emailOrUsername) => {
    const { Op } = require("sequelize");

    return await User.findOne({
        where: {
            [Op.or]: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        }
    });
};

const findById = async (id) =>{
    return await User.findOne({
        where: {user_id}
    });
}

const findByUsername = async (username)=>{
    return await User.findOne({
        where:{username}
    })
}

const createUser = async (userData)=>{
    return await User.create(userData);
};

const createStreak = async (userId) =>{
    return await StreakRecord.create({
        user_id : userId,
        current_streak: 0,
        longest_streak: 0
    })
}

const createGarden = async (userId) => {
    return await Garden.create({
        user_id: userId,
    });
}

const createWallet = async (userId)=>{
    return await CoinWallet.create({
        user_id: userId,
        total_coins: 3
    })
}

const getProfile = async (userId) => {
    return await User.findOne({
        where: { user_id: userId },
        attributes: {
            exclude: ['password']
        }
    });
}

const updateProfile = async (userId, userData)=>{
    await User.update(userData,{
        where: {
            user_id: userId
        }
    })
    return await getProfile(userId)
}
module.exports = {
    getProfile, 
    updateProfile, 
    findById, 
    findByEmail,
    findByUsername , 
    createUser, 
    createStreak, 
    createGarden, 
    createWallet,
    findByEmailOrUsername};