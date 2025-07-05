const express = require(`express`)
const PORT = 3000;
const cors = require(`cors`)
const app = express()
app.use(cors())
const dotenv = require(`dotenv`)
dotenv.config()
const connect = require(`./connection/connect`)

app.get("/",(req,res)=>{
    try {
        console.log("/","hitted")
        res.status(200).send({
            message:"Welcome to /Vehicle_Rental_App"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Some Error occured",
            data:error
        })
    }
})
connect()


app.listen(PORT,()=>{
    try {
        console.log(`Server running on ${PORT}`)
    } catch (error) {
        
    }
})