const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {


    const Vechile = sequelize.define('Vechile', {
        vechileType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vechileNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        noRent: {
            type: DataTypes.STRING,
            allowNull: false

        },

    }, {
        tableName: 'Vechiles',
        timestamps: true
    });
    return Vechile
}