
const express = require(`express`)
const Rental = require("../models/rentalSchema")
const rentalRoute = express.Router()
const User = require(`../models/userSchema`)
const Vehicle = require(`../models/vechileSchema`)
const { sequelize } = require("../connection/connect")
const { Op } = require('sequelize');


rentalRoute.post("/registerRental", async (req, res) => {
    const rentalDetails = req.body
    // console.log(rentalDetails)
    try {
       
        const [rentasExisting] = await sequelize.query(`SELECT EXISTS (
  SELECT *
  FROM Vehicle_Rental_Ap.rentals
  WHERE ${rentalDetails.rentalStartDate} BETWEEN rentalStartDate AND rentalEndDate
)`)
  console.log(rentasExisting)
        const findRegisteredUser = await User.findOne({
            where: {
                email: rentalDetails.rentalPersonEmail

            }
        })
        // console.log(findRegisteredUser, "21")
        const findExistingVechile = await Vehicle.findOne({
            where: { vehicleNumber: rentalDetails.rentalVehicleNumber }
        })
        // console.log(findExistingVechile, "25")
        const findExistingRental = await Rental.findOne({
            where: { rentalVehicleNumber: rentalDetails.rentalVehicleNumber }
        })
        // console.log(findExistingRental, "29")

        if (findRegisteredUser && findExistingVechile) {


            {
                const newRentalRegistration = await Rental.create({
                    rentalPersonName: rentalDetails.rentalPersonName,
                    rentalPersonAge: rentalDetails.rentalPersonAge,
                    rentalPersonEmail: rentalDetails.rentalPersonEmail,
                    rentalPersonDrivingLicenceNumber: rentalDetails.rentalPersonDrivingLicenceNumber,
                    rentalVehicleNumber: rentalDetails.rentalVehicleNumber,
                    rentalStartDate: rentalDetails.rentalStartDate,
                    rentalEndDate: rentalDetails.rentalEndDate

                })

                // console.log(newRentalRegistration)
                res.status(200).send({
                    status: "Success",
                    message: `${rentalDetails.rentalPersonName} is registered having ${rentalDetails.rentalVehicleNumber} `
                })
            }



        }


        else {
            res.status(401).send({
                message: `${rentalDetails.rentalVehicleNumber} is already registered`
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "some error occured",
            data: error
        })
    }



})

rentalRoute.get("/allRentals", async (req, res) => {
    console.log("getrequest for  all rentals recieved")
    try {
        const [rentals] = await sequelize.query('SELECT * FROM Vehicle_Rental_Ap.rentals;')
        console.log(rentals)

        res.status(200).send({
            status: "Success",
            message: "All rentals fetched",
            data: rentals
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "some error ocurred",
            data: error
        })
    }


})
function isDateBetween(targetDate, startDate, endDate) {
    const t = new Date(targetDate);
    const s = new Date(startDate);
    const e = new Date(endDate);

    return (t.getTime() >= s.getTime() && t.getTime() <= e.getTime())
}

// function isDateBetween(targetDate, startDate, endDate) {

//     const targetTime = targetDate.getTime();
//     const startTime = startDate.getTime();
//     const endTime = endDate.getTime();


//     const effectiveStartTime = Math.min(startTime, endTime);
//     const effectiveEndTime = Math.max(startTime, endTime);

//     return targetTime >= effectiveStartTime && targetTime <= effectiveEndTime;
// }


module.exports = rentalRoute


































module.exports = rentalRoute