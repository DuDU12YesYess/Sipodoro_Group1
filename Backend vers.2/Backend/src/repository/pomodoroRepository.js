const PomodoroCycle = require ('../models/PomodoroCycle')

const startCycle = async (cycleData)=> {
    return await PomodoroCycle.create(cycleData)
}

const getCycleById = async (cycleId) => {
  return await PomodoroCycle.findByPk(cycleId)
}


const updateCycle = async (cycleId, updateData)=>{
    await PomodoroCycle.update(updateData,{
        where: {
            cycle_id: cycleId
        }
    })
    return await getCycleById(cycleId)
}

const getHistory = async (userId)=>{
    return await PomodoroCycle.findAll({
        where: {
            user_id : userId
        },
        order : [["start_time", "DESC"]]
    })
}

const incrementFocusSession = async (cycleId) => {
    const cycle = await getCycleById(cycleId)

    cycle.completed_focus_sessions += 1
    await cycle.save()
    return cycle
};

const incrementBreak = async (cycleId) =>{
    const cycle = await getCycleById(cycleId)

    cycle.completed_break +=1
    await cycle.save()
    return cycle
}

const completeCycle = async (cycleId, updateData)=>{
    await PomodoroCycle.update(updateData,{
        where: {
            cycle_id: cycleId,

        }
    })
    return await getCycleById(cycleId)
}
const getActiveCycle = async(userId)=>{
    return await PomodoroCycle.findOne({
        where: {
            user_id: userId,
            completed_at: null
        }
    })
}
module.exports ={
    startCycle,getHistory,updateCycle,getCycleById, incrementBreak, incrementFocusSession,
    completeCycle, getActiveCycle
}