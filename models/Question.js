const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Question = sequelize.define('Question', {
    text: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('mcq', 'short_answer'), defaultValue: 'short_answer' },
});

module.exports = Question;
