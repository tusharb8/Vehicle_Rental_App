const express = require(`express`)
const PORT = 3000;
const cors = require(`cors`)
const app = express()
app.use(cors())
const dotenv = require(`dotenv`)
dotenv.config()
app.use(express.json())
const {connect} = require(`./connection/connect`)
const userRoute = require(`./routes/userRoute`)
const vehicleRoute = require(`./routes/vehicleRoute`)
const rentalRoute =  require(`./routes/rentalRoute`)
app.get("/", (req, res) => {
    try {
        console.log("/", "hitted")
        res.status(200).send({
            message: "Welcome to /Vehicle_Rental_App"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Some Error occured",
            data: error
        })
    }
})
connect()

app.use("/user",userRoute)
app.use("/vehicle",vehicleRoute)
app.use("/rental",rentalRoute)
app.listen(PORT, () => {
    try {
        console.log(`Server running on ${PORT}`)
    } catch (error) {

    }
})