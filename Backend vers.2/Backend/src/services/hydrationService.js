const hydrationRepository = require ('../repository/hydrationRepository')
const coinService = require("./coinService")
const flowerService = require("./flowerService")

const HYDRATION_COOLDOWN = 1;

const checkInWater = async (userId)=>{
  //get newest log
  const latestLog = await hydrationRepository.getLatestLog(userId);
  // if they never check-in before
  if (!latestLog) {
      return await hydrationRepository.createLog({
          user_id: userId,
          check_in_time: new Date()
      })
  }
  const now = new Date();

  const lastCheckIn = new Date(latestLog.check_in_time);

  const minutes = (now - lastCheckIn) / (1000 * 60);
  //check cool down
  if (minutes < HYDRATION_COOLDOWN) {
    throw new Error(
        `Please wait ${
            Math.ceil(HYDRATION_COOLDOWN - minutes)
        } more minute.`
    );
  }
  const log = await hydrationRepository.createLog({
    user_id: userId,
    check_in_time : now
  })
  
  console.log("Before coin:", userId)

  await coinService.addCoin(userId, 1)
  console.log("Coin added")

  await flowerService.growFlower(userId)
  console.log("Flower grown")

  return log
}

const getHistory = async (userId)=>{
  return await hydrationRepository.getAllLogs(userId)
}

module.exports ={
  checkInWater,
  getHistory
}