const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Survey = sequelize.define('Survey', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
});

module.exports = Survey;
