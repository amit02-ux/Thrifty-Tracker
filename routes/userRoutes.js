const express=require('express')
const   {loginController,registerController,forgot_passwordController,reset_passwordController,change_passwordController}=require("../controllers/userController");
const router=express.Router()
router.post('/login',loginController)
router.post('/register',registerController)
router.post('/forgot_password',forgot_passwordController)
router.get('/reset_password/:token',reset_passwordController)
router.post('/change_password/:token',change_passwordController)
module.exports=router








