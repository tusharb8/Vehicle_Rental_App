const { DataTypes } = require('sequelize');
const {sequelize} = require (`../connection/connect`)

  const Vehicle= sequelize.define('Vehicle', {   
    vehicleType: { type: DataTypes.STRING, allowNull: false },
    vehicleNumber: { type: DataTypes.STRING, allowNull: false },  
    noRent: { type: DataTypes.BOOLEAN, allowNull: false }
  }, {
    tableName: 'vehicles',
    timestamps: true
  });
 
module.exports = Vehicle