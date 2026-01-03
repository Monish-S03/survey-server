const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Response = sequelize.define('Response', {});

module.exports = Response;
