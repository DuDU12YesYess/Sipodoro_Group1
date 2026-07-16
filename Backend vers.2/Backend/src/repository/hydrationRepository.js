const HydrationLog = require ('../models/HydrationLog')

const getAllLogs = async (userId)=>{
  return await HydrationLog.findAll({
    where: {
      user_id: userId
    }
  })
}

const getLogById = async (userId, logId)=>{
  return await HydrationLog.findOne({
    where: {
      user_id: userId,
      hydration_id : logId
    }
  })
}

const createLog = async (logData)=>{
  return await HydrationLog.create(logData)
}
const getLatestLog = async (userId)=>{
    return await HydrationLog.findOne({
        where: {
            user_id: userId
        },
        order: [["check_in_time", "DESC"]]
    });
};


module.exports={
  getAllLogs,
  getLogById,
  createLog,
  getLatestLog
}
