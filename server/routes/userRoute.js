
const express = require(`express`)
const User = require("../models/userSchema")
const userRoute = express.Router()



userRoute.post("/registerUser", async(req,res)=>{
const userDetais = req.body
console.log(userDetais)
try {
   const findExistingUser = await User.findOne({
    where:{ email : userDetais.email}
   })
   if(!findExistingUser){
    const newUserRegistration = await User.create({
        name:userDetais.name,
        age:userDetais.age,
        email:userDetais.email,
        drivingLicenceNumber:userDetais.drivingLicenceNumber,
        panCard:userDetais.panCard
    })

    console.log(newUserRegistration)
    res.status(200).send({
        status:"Success",
        message:`${userDetais.email} is registered having ${userDetais.drivingLicenceNumber} `
    })
   }
   else{
    res.status(401).send({
        message:`${userDetais.email} is already registered`
    })
   }
} catch (error) {
    console.log(error)
    res.status.send({
        message:"some error occured",
        data:error
    })
}



})







































module.exports = userRoute