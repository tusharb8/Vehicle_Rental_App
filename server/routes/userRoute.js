
const express = require(`express`)
const User = require("../models/userSchema")
const { sequelize } = require("../connection/connect")
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
userRoute.get("/allUsers",async(req,res)=>{
    console.log("getrequest for  all users recieved")
try {
    const [users] = await sequelize.query('SELECT * FROM Vehicle_Rental_Ap.users;')
    console.log(users)
    res.status(200).send({
        status:"Success",
        message:"All users fetched",
        data:users
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        message:"some error ocurred",
        data:error
    })
}


})

userRoute.delete('/deleteUser/:id', async (req, res) => {
  const  {id}  = req.params;
console.log(id)
  try {
    const requestedUser = await User.findByPk(id); 
    if (!requestedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await requestedUser.destroy(); 

    res.status(200).json({
      message: `User with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error executing delete query:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user',
      error: error.message,
    });
  }
});





































module.exports = userRoute