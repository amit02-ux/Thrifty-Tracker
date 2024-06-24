const express=require('express')
const   {loginController,registerController,forgot_passwordController}=require("../controllers/userController");
const router=express.Router()
router.post('/login',loginController)
router.post('/register',registerController)
router.post('/forgot_password',forgot_passwordController)
module.exports=router








