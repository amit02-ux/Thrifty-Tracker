const express=require('express')
const   {addTransaction,getTransactions,editTransactions,deletTransactions,add_Due_Transaction,get_Due_Transaction,delete_Due_Transaction}=require("../controllers/transactionCtrl");

const router=express.Router()
router.post('/Add_tran',addTransaction)
router.post('/get_transaction',getTransactions)
router.post('/edit_transaction',editTransactions)
router.post('/delet_transaction',deletTransactions)
router.post('/add_due_transaction',add_Due_Transaction)
router.post('/get_due_transaction',get_Due_Transaction)
router.post('/deletdue_transaction',delete_Due_Transaction)


module.exports=router