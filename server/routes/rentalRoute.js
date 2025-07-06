
const express = require(`express`)
const Rental = require("../models/rentalSchema")
const rentalRoute = express.Router()
const User = require(`../models/userSchema`)
const Vehicle = require(`../models/vechileSchema`)


rentalRoute.post("/registerRental", async (req, res) => {
    const rentalDetails = req.body
    console.log(rentalDetails)
    try {
        const findRegisteredUser = await User.findOne({
            where: {
                email: rentalDetails.rentalPersonEmail

            }
        })
        const findExistingVechile = await Vehicle.findOne({
            where: { vehicleNumber: rentalDetails.rentalVehicleNumber }
        })
        //    const findExistingRental = await Rental.findOne({
        //     where:{ rentalVehicleNumber : rentalDetails.rentalVehicleNumber}
        //    })
        if (findRegisteredUser && findExistingVechile) {
            const newRentalRegistration = await Rental.create({
                rentalPersonName: rentalDetails.rentalPersonName,
                rentalPersonAge: rentalDetails.rentalPersonAge,
                rentalPersonEmail: rentalDetails.rentalPersonEmail,
                rentalPersonDrivingLicenceNumber: rentalDetails.rentalPersonDrivingLicenceNumber,
                rentalVehicleNumber: rentalDetails.rentalVehicleNumber,
                rentalStartDate: rentalDetails.rentalStartDate,
                rentalEndDate: rentalDetails.rentalEndDate

            })

            console.log(newRentalRegistration)
            res.status(200).send({
                status: "Success",
                message: `${rentalDetails.rentalPersonName} is registered having ${rentalDetails.rentalVehicleNumber} `
            })
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




module.exports = rentalRoute


































module.exports = rentalRoute