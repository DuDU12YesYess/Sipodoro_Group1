const userService = require("../services/userService");

//getProfile 
const getProfile = async (req, res,next)=>{
  try{
    console.log("getProfile request userId:", req.user.user_id)

    const userId = req.user.user_id
    const result = await userService.getProfile(userId)
    return res.status(200).json(result)
  }catch(error){
    console.error('Error message: ', error.message)
    next(error)
  }
}

//updateProfile
const updateProfile = async (req, res)=>{
  try{
    console.log("updateProfile request userId:", req.user.user_id)

    const userId = req.user.user_id
    const userData = req.body
    const result = await userService.updateProfile(userId,userData)
    return res.status(200).json(result)
  }catch(error){
    console.error('Error message: ', error.message)
    next(error)
  }
}

module.exports = {getProfile, updateProfile}