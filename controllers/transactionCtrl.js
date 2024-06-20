const transModel=require('../models/transModel')

const moment=require('moment')

const getTransactions=async(req,res)=>{
    const {frequency,type,range,selecteddate}=req.body;
    try{
const transactions =await transModel.find({

...(frequency!=='custom'?{
    date:{
        $gt:moment().subtract(Number(frequency),"d").toDate(),
    }
,
}:{
    date:{
        $gt:selecteddate[0],
        $lt:selecteddate[1],
    }
}),
...(type!='All'&&{type})

   ,userid:req.body.userid,
 
   

})
console.log(transactions)
console.log(type),
  

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