const pomodoroService = require ('../services/pomodoroService')

const startCycle = async (req, res,next) =>{
  try{
    const userId = req.user.user_id
    const setttings = req.body
    const cycle = await pomodoroService.startCycle(userId, setttings)
    return res.status(201).json(cycle)
  }catch (error){
    next(error)
  }
}

const comepleteFocusSession = async (req, res,next)=>{
  try{
    const {cycleId} = req.params
    const cycle = await pomodoroService.completeFocusSession(cycleId)

    return res.status(200).json(cycle)
  }catch (error){
    next(error)
  }
}

const comepleteBreak= async (req, res,next)=>{
  try{
    const {cycleId} = req.params
    const cycle = await pomodoroService.completeBreak(cycleId)

    return res.status(200).json(cycle)
  }catch (error){
    next(error)
  }
}

const getHistory = async (req, res,next)=>{
  try{
    const userId = req.user.user_id
    const history = await pomodoroService.getHistory(userId)

    return res.status(200).json(history)
  }catch (error){
    next(error)
  }
}

module.exports={
  startCycle,
  comepleteBreak,
  comepleteFocusSession,
  getHistory
}