const sequelize = require('./config/database');
const { QueryTypes } = require('sequelize');

async function testConnection() {
  try {
    // 1. Test the connection itself
    await sequelize.authenticate();
    console.log('✅ Connection to MySQL has been established successfully.');

    // 2. Run the actual query
    const users = await sequelize.query('SELECT * FROM user;', {
      type: QueryTypes.SELECT
    });
    console.log('✅ Query successful. Users:', users);

  } catch (error) {
    console.error('❌ Unable to connect or query:');
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

testConnection();