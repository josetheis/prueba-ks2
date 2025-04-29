const { Sequelize } = require('sequelize');
const config = require('../config/config');
const userModel = require('./user');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  }
);

const User = userModel(sequelize);

module.exports = {
  sequelize,
  User,
};