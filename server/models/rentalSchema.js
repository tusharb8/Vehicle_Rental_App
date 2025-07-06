const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../connection/connect');
const Rental = sequelize.define('Rental', {
  rentalPersonName: { type: DataTypes.STRING, allowNull: false },
  rentalPersonAge: { type: DataTypes.STRING, allowNull: false },
  rentalPersonEmail: { type: DataTypes.STRING, allowNull: false },
  rentalVehicleNumber: { type: DataTypes.STRING, allowNull: false },
  rentalPersonDrivingLicenceNumber: { type: DataTypes.STRING,  allowNull: false },
  rentalStartDate: { type: DataTypes.DATE, allowNull: false },
  rentalEndDate: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: 'rentals',
  timestamps: true
});

module.exports = Rental
