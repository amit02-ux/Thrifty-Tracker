const transModel=require('../models/transModel')

const Due_tran_Model=require('../models/Due_transModel')


const moment=require('moment')

const getTransactions=async(req,res)=>{
    const {frequency,type,selecteddate}=req.body;
    // console.log(selecteddate)


    try{
    console.log("amit")
  const  transactions =await transModel.find({
   userid,
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
        
           ,
         
           
        
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
        // const {userid}=req.body;
        // console.log(userid)
        // console.log(newTransaction)
       
        await newTransaction.save();
        res.status(201).send("Transaction created")


    }
    catch(error){
        console.log("hii");
        console.log(error)
        res.status(400).json(error)

    }

}
const add_Due_Transaction=async(req,res)=>{
    try{
        const newTransaction=new Due_tran_Model(req.body)
        // const {userid}=req.body;
        // console.log(userid)
        // console.log(newTransaction)
       
        await newTransaction.save();
        res.status(201).send("Due_Transaction created")


    }
    catch(error){
        console.log("hii");
        console.log(error)
        res.status(400).json(error)

    }

}
const get_Due_Transaction=async(req,res)=>{
    try{
        console.log(req.body)
       const res1=await Due_tran_Model.find({userid:req.body.userid});
       console.log(res1);
    //    res.status(201).json(res);
    res.status(201).send(res1)

    }
    catch(error){
        console.log(error);
        res.status(400).json({success:false,msg:error.message})
    }

}
const delete_Due_Transaction=async(req,res)=>{
    try{
        console.log("amit");
        const dueId=req.body.due_id;
        console.log(dueId)
        const deletedTransaction = await Due_tran_Model.findOneAndDelete({ _id:dueId });
        if(deletedTransaction){
            res.status(200).send("Deleted successfully");
        }
        else{
            res.status(400).send("Transaction not found")
        }

    }
    catch(error){
        res.status(400).json({success:false,msg:error.message})
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
module.exports={getTransactions,addTransaction,editTransactions,deletTransactions,add_Due_Transaction,delete_Due_Transaction, get_Due_Transaction}
