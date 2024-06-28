const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const connectDb=require("./config/connectDb")
dotenv.config()
// rest object 
connectDb()
const app=express()
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.set("view engine","ejs")
// app.get('/',(req,res)=>{
//     res.send("<h1>Hello from amit</h1>"

//     )
// })
// User
app.use('/api/v1/users',require('./routes/userRoutes'))
// Transaction
app.use('/api/v1/transactions',require('./routes/transactionRoutes'))


const PORT=8080|| process.env.PORT
//listen
app.post('/api/v1/test',(req,res)=>{
    console.log(req.body)
    res.status(200).json({success:true});
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${
        PORT}`)
})

