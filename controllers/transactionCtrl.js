const transModel=require('../models/transModel')


const moment=require('moment')

const getTransactions=async(req,res)=>{
    const {frequency,type,selecteddate}=req.body;
    // console.log(selecteddate)


    try{
        
 

       
 
    
  const  transactions =await transModel.find({

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
const editTransactions=async(req,res)=>{
    try{
        await transModel.findOneAndUpdate({_id:req.body.transactionsId},req.body.payload);
        res.status(200).send("Edit Successfully")

    }
    catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}
const deletTransactions=async(req,res)=>{

    try{
        const transactionId=req.body.transactionId;
        const deletedTransaction = await transModel.findOneAndDelete({ _id: transactionId });
        if(deletedTransaction){
            res.status(200).send("Deleted successfully");
        }
        else{
            res.status(400).send("Transaction not found")
        }
        
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
const searchTransactions=async(req,res)=>{
    try{
        const [date,name,amount,mode,category,references]=req.body;
        const transaction=null;
        if(date){
            transaction=await transModel.find({ date:date });
        }
        if(name){
        transaction=await transModel.find({name:name });

        }
        if(amount){
            transaction=await transModel.find({amount:{
                $gte:amount
            }})
            

        }
        if(mode){
            transaction=await transModel.find({mode:mode});
        }
        if(category){
            transaction=await transModel.find({category:category})
        }
        if(references){
            transaction =await transModel.find({ references:references})

        }


    }
    catch(error){
        console.log(error);
        res.status.json(error)
    }

}
module.exports={getTransactions,addTransaction,editTransactions,deletTransactions}