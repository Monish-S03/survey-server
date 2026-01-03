const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: console.log,
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.original ? error.original.message : error.message);
        if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
            console.log(`SUGGESTION: Please create the database '${process.env.DB_NAME}' in MySQL.`);
        }
        if (error.original && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log(`SUGGESTION: Check your DB_USER and DB_PASS in .env.`);
        }
    } finally {
        process.exit();
    }
}

testConnection();
