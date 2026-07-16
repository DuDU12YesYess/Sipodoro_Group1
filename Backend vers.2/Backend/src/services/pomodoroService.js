const PomodoroRepository = require ('../repository/pomodoroRepository')
const StreakService = require ('../services/streakService')

const getExistingCycle = async (cycleId)=>{
    const cycle = await PomodoroRepository.getCycleById(cycleId)

    if (!cycle){
        const error = new Error('Cycle not found')
        error.status = 404
        throw error
      }
    return cycle
}
const startCycle = async (userId, settings)=>{
    const activeCycle =await PomodoroRepository.getActiveCycle(userId)

    if (activeCycle) {
        const error = new Error('You already have an active Pomodoro cycle.')
        error.status = 401
        throw error
    }
    const {focus_duration, break_duration} = settings
    const cycleData = {
        user_id: userId,
        focus_duration : focus_duration || 25,
        break_duration: break_duration || 5,
        start_time: new Date(),
        completed_focus_sessions: 0,
        completed_break: 0,
        streak_earned: 0
    }

    return await PomodoroRepository.startCycle(cycleData)

}

const completeFocusSession = async (cycleId)=>{
    await getExistingCycle(cycleId);

    const updateCycle = await PomodoroRepository.incrementFocusSession(cycleId)
    if (updateCycle.completed_focus_sessions === 4){
        return await completeCycle(cycleId)
    }else{
        return updateCycle
    }
}

const completeBreak = async (cycleId)=>{
    await getExistingCycle(cycleId);
    
    const updateCycle = await PomodoroRepository.incrementBreak(cycleId)
    return updateCycle
}

const completeCycle = async (cycleId)=>{
    const cycle = await getExistingCycle(cycleId)
    const completedCycle = await PomodoroRepository.completeCycle(cycleId,{
      end_time : new Date(),
      completed_at : new Date(),
      streak_earned : 1
    })
    await StreakService.updateStreak(cycle.user_id)

    return completedCycle
}

const getHistory = async (userId)=>{
    return await PomodoroRepository.getHistory(userId)
}

module.exports={
  startCycle,
  completeFocusSession,
  completeBreak,
  completeCycle,
  getHistory
}
