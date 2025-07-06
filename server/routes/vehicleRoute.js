
const express = require(`express`)
const Vehicle = require("../models/vechileSchema")
const vehicleRoute = express.Router()
const {sequelize} = require('../connection/connect')


vehicleRoute.post("/registerVechile", async(req,res)=>{
const vechileDetais = req.body
console.log(vechileDetais)
try {
   const findExistingVechile = await Vehicle.findOne({
    where:{ vehicleNumber : vechileDetais.vehicleNumber}
   })
   if(!findExistingVechile){
    const newVechileRegistration = await Vehicle.create({
        vehicleType:vechileDetais.vehicleType,
        vehicleNumber:vechileDetais.vehicleNumber,
        noRent:vechileDetais.noRent,
        
    })

    console.log(newVechileRegistration)
    res.status(200).send({
        status:"Success",
        message:`${vechileDetais.vehicleNumber} is registered having ${vechileDetais.vehicleType} `
    })
   }
   else{
    res.status(401).send({
        message:`${vechileDetais.vehicleNumber} is already registered`
    })
   }
} catch (error) {
    console.log(error)
    res.status(400).send({
        message:"some error occured",
        data:error
    })
}



})
vehicleRoute.get("/allVehicles",async(req,res)=>{
    console.log("get all vevhiles recieved")
try {
    const [vehicles] = await sequelize.query('SELECT * FROM Vehicle_Rental_Ap.vehicles;')
    console.log(vehicles)
    res.status(200).send({
        status:"Success",
        message:"All vehicles fetched",
        data:vehicles
    })
} catch (error) {
    // console.log(error)
    res.status(400).send({
        message:"some error ocurred",
        data:error
    })
}


})

vehicleRoute.delete('/deleteVehicle/:id', async (req, res) => {
  const  {id}  = req.params;
console.log(id)
  try {
    const vehicle = await Vehicle.findByPk(id); 
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await vehicle.destroy(); 

    res.status(200).json({
      message: `Vehicle with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error executing delete query:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete vehicle',
      error: error.message,
    });
  }
});


module.exports = vehicleRoute


































module.exports = vehicleRoute