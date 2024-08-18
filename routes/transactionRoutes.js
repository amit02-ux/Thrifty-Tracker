const express=require('express')
const authMiddlewares = require("../middlewares/authMiddlewares.js");
const   {addTransaction,getTransactions,editTransactions,deletTransactions,add_Due_Transaction,get_Due_Transaction,delete_Due_Transaction}=require("../controllers/transactionCtrl");

const router=express.Router()
router.post('/Add_tran',authMiddlewares,addTransaction)
router.post('/get_transaction',authMiddlewares,getTransactions)
router.post('/edit_transaction',authMiddlewares,editTransactions)
router.post('/delet_transaction',authMiddlewares,deletTransactions)
router.post('/add_due_transaction',authMiddlewares,add_Due_Transaction)
router.post('/get_due_transaction',authMiddlewares,get_Due_Transaction)
router.post('/deletdue_transaction',authMiddlewares,delete_Due_Transaction)


module.exports=router
