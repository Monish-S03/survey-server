const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Answer = sequelize.define('Answer', {
    text: { type: DataTypes.TEXT }, 
});

module.exports = Answer;
