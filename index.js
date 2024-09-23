const express = require('express')
const bookRouter = require('./routes/bookRouter')
const {connectToMongoDB} = require('./connection')
const userRouter = require('./routes/userRouter')
require('dotenv').config()
const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
//Middleware
//connectToMongoDB("mongodb://127.0.0.1:27017/book-api")
connectToMongoDB(process.env.MONGO_URL)
.then(() => {
    console.log(`Connected To MongoDB`)
})
.catch(() => {
    console.log(`Error in MongoDB Connection`)
})

app.use('/api', bookRouter) //middleware left

app.use('/api', userRouter)
app.listen(port, () => {
    console.log(`Server started at Port ${port}`)
})
