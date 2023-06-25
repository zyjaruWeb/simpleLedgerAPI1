//import neccessary items and frameworks

const express = require("express")
const app = express()
// const firebase = require('firebase')
const routes = require("./routes/router")
const connectDB = require("./dbConnect/connect")
require("dotenv").config()
const notFound = require("./middleware/notFound")
const errHndlr = require("./middleware/errHndlr")



//middleware
app.use(express.static("./public"))//connect to html
app.use(express.json()) //parse incoming requests and return object


app.use("/api/v1/entries", routes)
app.use(notFound)
app.use(errHndlr)


const port = "3000"  //hardcode server for localhost 3000
const PORT = process.env.PORT || 3000 // server for deployement



//create server on localhost:3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()