const express = require('express')
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const app = express()

const router = require('./router')
const db = require('./database/connection')

db.connect()


app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//cors
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//router
app.use('/', router)

//server
const port = process.env.port || 8080
app.listen(port, () =>{
  console.log(`Server listening on port ${port}`)
})