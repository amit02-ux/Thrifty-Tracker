const userModel=require("../models/userModel");
const nodemailer=require("nodemailer");
const randomstring=require("randomstring")
require('dotenv').config();
const express = require('express');
const app = express();
// const bcryptjs=require("bcryptjs")
// const jwt=require("jsonwebtoken")
const crypto = require('crypto');
app.use(express.urlencoded({extended:false}))


const loginController =async(req,res)=>{
    try{
        console.log("hell");
        const {email,password}=req.body;
        const user=await userModel.findOne({email,password});
        if(!user){
            return res.status(404).send({ message: "User not found" });

        }
        res.status(200).json({
            success:true,
            user,
        })
        const randomString=randomstring.generate();
        console.log('Random string:',randomString)
        const hash = crypto.createHash('sha256').update(randomString).digest('hex');
console.log('Hashed String:', hash);
        const t=Date.now()+10*60*1000;
        console.log(t);
        const futureDate = new Date(t);
console.log(futureDate.toString());
        await userModel.updateOne({email:req.body.email},{$set:{ password_reset_token:hash, password_reset_token_expire:t}})



    }
    catch(error){
       
        res.status(400).json({
            success:false,
            error,

        })

    }

}
const registerController = async(req,res)=>{
    console.log("hello");
    try{
        const newUser=new userModel(req.body);
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser
        })

        
    }
    catch(error){
        res.status(400).json({
            success:false,
            error,
        })
    }
}
//Controller for Send-Email
const SendEmail=async(name,email,token)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.UserEmail,
                pass:process.env. UserPassword


            }
        })
        const mailoptions={
            from:process.env.UserEmail,
            to:email,
            subjet:'For Reset password',
            html:`<p>Hi ${name}, please click the following link to reset your password:</p>
                          <p><a href="http://localhost:8080/api/v1/users/reset_password/${token}">Reset Password</a></p>`
        }
transporter.sendMail(mailoptions,(error,info)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Mail has been send:",info.response)
    }
   
})

    }

    catch(error){
        
        console.log("Email can not sent")
       console.log(error);
    }
}
//Controller for Forgot-password
const forgot_passwordController=async(req,res)=>{
    try{
        console.log("user email",process.env.UserEmail);
        console.log("user password",process.env.UserPassword);
        const User=await userModel.findOne({email:req.body.email});
        if(!User){
            // console.log("user not exit")
            res.status(200).send({
                success:true,
                msg:"This email does not exit"
            })
        }
        else{
            
    
            const randomString=randomstring.generate();
            console.log('Random string:',randomString)
            const hash = crypto.createHash('sha256').update(randomString).digest('hex');
    console.log('Hashed String:', hash);
            const t=Date.now()+10*60*1000;
            console.log(t);
            const futureDate = new Date(t);
    console.log(futureDate.toString());
            await userModel.updateOne({email:req.body.email},{$set:{ password_reset_token:hash, password_reset_token_expire:t}})
            SendEmail(User.name,User.email,hash)
    
    res.status(200).json({
        success:true,
        msg:"reset passord successfully"
    })

        }

    }
    catch(error){
        res.status(400).send({
            success:false,
            error
        })
    }

}
const reset_passwordController=async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    const user=await userModel.find({
        password_reset_token:token});
        console.log(user)
        console.log("password:",password)

    console.log("token for reset passwod is:",token)
res.render("index");
}
module.exports={loginController,registerController,forgot_passwordController,reset_passwordController

}