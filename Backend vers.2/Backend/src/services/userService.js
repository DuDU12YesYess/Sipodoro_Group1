const userRepository = require("../repository/userRepository")

//getProfile 
const getProfile = async (userId) => {
    const user = await userRepository.getProfile(userId)

    if(!user){
        const error = new Error('User not found!')
        error.status = 404
        throw error
    }
    return user
}

//update profile 
const updateProfile = async (userId, userData) => {
    const { username, email } = userData;

    const currentUser = await userRepository.findById(userId);

    if (!currentUser) {
        const error = new Error('User not found!')
        error.status = 404
        throw error
    }

    const existingUsername = await userRepository.findByUsername(username);

    if (existingUsername && existingUsername.user_id !== userId) {
        const error = new Error('This username already exists!')
        error.status = 401
        throw error
    }

    const existingEmail = await userRepository.findByEmail(email);

    if (existingEmail && existingEmail.user_id !== userId) {
        const error = new Error('This email already exists!')
        error.status = 401
        throw error
    }

    return await userRepository.updateProfile(userId, {
        username,
        email,
    });
};

module.exports = {
    getProfile,
    updateProfile,
};