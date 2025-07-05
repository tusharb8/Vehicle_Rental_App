const {  DataTypes } = require('sequelize');



module.exports = (sequelize) => {


    const Rental = sequelize.define('Rental', {
        rentalPersonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
         rentalPersonAge: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
         rentalPersonEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
         rentalPersonDrivingLicenceNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
         rentalStartDate: {
            type: DataTypes.DATE,
              allowNull: false
        },
          rentalEndDate: {
            type: DataTypes.DATE,
              allowNull: false
        }
    }, {
        tableName: 'Rentals',
        timestamps: true
    });
    return Rental
}