const transModel=require('../models/transModel')


const getTransactions=async(req,res)=>{
    try{
const transactions =await transModel.find({userid:req.body.userid})
console.log(transactions)

res.status(201).json(transactions)

    }
    catch(error){
        res.status(400).json(error)

    }

}
const addTransaction=async(req,res)=>{
    try{
        const newTransaction=new transModel(req.body)
       
        await newTransaction.save();
        res.status(201).send("Transaction created")


    }
    catch(error){
        console.log("hii");
        console.log(error)
        res.status(400).json(error)

    }

}
module.exports={getTransactions,addTransaction}