const hydrationRepository = require ('../repository/hydrationRepository')
const coinService = require("./coinService")
const flowerService = require("./flowerService")
const flowerRepository = require("../repository/flowerRepository")

const HYDRATION_COOLDOWN = 3; // <-------------- for demo change from 1m to 3s
const DEFAULT_SEED_ID = 5;

const ensureFlower = async (userId) => {
  let flower = await flowerRepository.getCurrentFlower(userId);
  if (!flower || flower.status === 'Bloomed') {
    flower = await flowerRepository.createFlower({
      user_id: userId,
      seed_id: DEFAULT_SEED_ID,
      growth_stage: 0,
      status: 'Sprout',
      date_planted: new Date()
    });
  }
  return flower;
};

const checkInWater = async (userId)=>{
  const latestLog = await hydrationRepository.getLatestLog(userId);

  if (!latestLog) {
      const log = await hydrationRepository.createLog({
          user_id: userId,
          check_in_time: new Date()
      })
      await coinService.addCoin(userId, 1)
      await ensureFlower(userId)
      await flowerService.growFlower(userId)
      return log
  }

  const now = new Date();
  const lastCheckIn = new Date(latestLog.check_in_time);
  // const minutes = (now - lastCheckIn) / (1000 * 60); 
  const seconds = (now - lastCheckIn) / 1000; //<----------- change from minutes to seconds

  if (seconds < HYDRATION_COOLDOWN) {  //<----------- change from minutes to seconds
    throw new Error(
        `Please wait ${
            Math.ceil(HYDRATION_COOLDOWN - seconds)
        } more second(s).`
    );
  }
  const log = await hydrationRepository.createLog({
    user_id: userId,
    check_in_time : now
  })
  
  await coinService.addCoin(userId, 1)
  await ensureFlower(userId)
  await flowerService.growFlower(userId)

  return log
}

const getHistory = async (userId)=>{
  return await hydrationRepository.getAllLogs(userId)
}

module.exports ={
  checkInWater,
  getHistory
}