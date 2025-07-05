const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.LOCALHOST,
  dialect: "mysql",
   logging: false,
});
const connect = async ()=>{
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
module.exports = connect
