const { Sequelize } = require('sequelize');
// const User = require(`../models/userSchema`)
// const Vechile = require(`../models/vechileSchema`)
// const Rental = require(`../models/rentalSchema`)
console.log(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD);

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.LOCALHOST,
  dialect: "mysql",
  logging: false,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = { sequelize, connect }
