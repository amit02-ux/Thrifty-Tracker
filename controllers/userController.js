const userModel=require("../models/userModel");
const nodemailer=require("nodemailer");
const randomstring=require("randomstring")
// const bcryptjs=require("bcryptjs")
// const jwt=require("jsonwebtoken")
const crypto = require('crypto');

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
const forgot_passwordController=async(req,res)=>{
    try{
        const User=await userModel.findOne({email:req.body.email});
        if(!User){
            console.log("user not exit")
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
module.exports={loginController,registerController,forgot_passwordController

}