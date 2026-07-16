const coinRepository = require ('../repository/coinRepository')

const getWallet = async (userId) =>{
  const wallet =await coinRepository.getWallet(userId)

  if (!wallet){
    const error = new Error("Wallet not found!")
    error.status = 404
    throw error
  }

  return wallet
}

const addCoin = async (userId, amount)=>{
  const wallet = await getWallet(userId)
  const totalCoins = wallet.total_coins + amount
  await coinRepository.updateWallet(userId,totalCoins)
  await coinRepository.createTransaction(userId, amount)
  return await coinRepository.getWallet(userId)
}

const spendCoin = async (userId,amount)=>{
  const wallet = await coinRepository.getWallet(userId)

  if(wallet.total_coins<amount){
    const error = new Error('Not enough coins ;<')
    error.status = 400
    throw error
  }
  const totalCoins = wallet.total_coins - amount
  await coinRepository.updateWallet(userId,totalCoins)
  await coinRepository.createTransaction(userId, -amount)
  return await coinRepository.getWallet(userId)
}

const getTransactions = async (userId) => {
    return await coinRepository.getTransactions(userId);
}

module.exports = {
    getWallet,
    addCoin,
    spendCoin,
    getTransactions
}