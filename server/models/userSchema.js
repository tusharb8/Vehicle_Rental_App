const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../connection/connect');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    drivingLicenceNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    panCard: { type: DataTypes.STRING, unique: true }
}, {
    tableName: 'users',
    timestamps: true
});


module.exports = User