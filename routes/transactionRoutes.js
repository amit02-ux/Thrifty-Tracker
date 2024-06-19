const express=require('express')
const   {addTransaction,getTransactions}=require("../controllers/transactionCtrl");

const router=express.Router()
router.post('/Add_tran',addTransaction)
router.post('/get_transaction',getTransactions)

module.exports=router