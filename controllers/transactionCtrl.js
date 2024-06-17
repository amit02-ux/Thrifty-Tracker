const transactionModel=require('../models/transactionModel')

const getTransactions=async(req,res)=>{
    try{
const transactions =await transactionModel.find({userid:req.body.userid})
res.status(201).json(transactions)

    }
    catch(error){
        res.status(400).json(error)

    }

}
const addTransaction=async(req,res)=>{
    try{
        const newTransaction=new transactionModel(req.body)
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