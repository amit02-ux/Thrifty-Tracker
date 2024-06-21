const express=require('express')
const   {addTransaction,getTransactions,editTransactions,deletTransactions}=require("../controllers/transactionCtrl");

const router=express.Router()
router.post('/Add_tran',addTransaction)
router.post('/get_transaction',getTransactions)
router.post('/edit_transaction',editTransactions)
router.post('/delet_transaction',deletTransactions)


module.exports=router