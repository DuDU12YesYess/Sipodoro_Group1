const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false }
        });
        
        // DROP the items table
        await conn.query('DROP TABLE IF EXISTS items');
        console.log('items table DROPPED!');
        
        // Verify it's gone
        const [rows] = await conn.query("SHOW TABLES LIKE 'items'");
        if (rows.length === 0) {
            console.log('Confirmed: items table no longer exists');
        } else {
            console.log('items table still exists!');
        }
        
        await conn.end();
    } catch (error) {
        console.error('Error:', error.message);
    }
})();

// node drop_table.js