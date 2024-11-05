const userModel=require("../models/userModel");
const nodemailer=require("nodemailer");
const randomstring=require("randomstring")
require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Set views directory
// const bcrypt=require("bcrypt")
// const jwt=require("jsonwebtoken")
const crypto = require('crypto');
// app.set('views', path.join(__dirname, 'views')); // Set views directory
app.set('view engine', 'ejs'); // Set EJS as the view engine


app.use(express.urlencoded({ extended: true }));
const loginController =async(req,res)=>{
    try{
        console.log("hguiiu12345")
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
          
            return res.status(200).send({message: "User Not Found" ,success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
           
        
            return res.status(200).send({message: "Invalid Email or Password" ,success:false})
        }
     
        const token = jwt.sign({ _id: user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
     
       console.log(token)
      return   res.status(200).send({message:"Login Successfully",success:true,
            user: {
                name: user.name,
                email: user.email,
              },
              token,
        })

       
       

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
        const {email,password} = req.body
      if(password.length<8){
        res.status(200).json({success:true,
            msg:"Length of the password should be atleast 8"
        })

      }
      else{
        const user=await userModel.findOne({email:email})
        if(user){
            console.log("user already exit")
            res.status(200).json({success:true,
                msg:"User already exit"
            })
        }
        else{
            console.log(req.body.name)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        
        const newUser=new userModel(req.body);
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser
        })
        }


      }
        
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
            subject:'For Reset password',
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
 
    try{
        const {token}=req.params;
        console.log("reset-password");
    // const {password}=req.body;
    // console.log("Amit Babu")
  
    const user=await userModel.find({
        password_reset_token:token});
        console.log(user)
        // console.log("password:",req)
        // res.render("index",{token});
        if(!user){
           console.log("User does not exit")
           res.status(200).json({success:true,
            msg:"User does not exit"
           })
        }
        else{
            res.render("index",{ token ,status:"Not verified"});
        }
          
        

    // console.log("token for reset passwod is:",token)
    }
    catch(error){
        console.log(error);
        res.status(400).send("Some thing wrong with reset password")
    }

}
const change_passwordController=async(req,res)=>{
   
   
   try{
    const {token}=req.params;
    const {password,confirmPassword}=req.body;
    const user=await userModel.findOne({
        password_reset_token:token,password_reset_token_expire:{
            $gt:Date.now()
        }})
      if(!user){
       
        console.log("Token expired")
        res.status(200).json({success:true,
            msg:"Token has expired"
        })
      }
      else{
        console.log(password)
        console.log(req.body)
        console.log(token)
        if(password!=confirmPassword){
            res.status(200).json({success:true,
                msg:"Password do not match with the confirm-password"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)
        await userModel.updateOne({ password_reset_token:token},{$set:{
            password:hashedPassword
        }})
        user.password_reset_token=undefined;
        user.password_reset_token_expire=undefined;
        user.updatedAt=Date.now();
        user.save();
        res.render("index",{token,status:"verified"})
        // res.status(200).json({success:true,
        //     msg:"Password changed"
        // })

      }
   }

   catch(error){
    
    console.log(error)
    res.status(400).json({success:false,
        msg:error.message
    })
   }
// console.log(req.body)
// res.status(200).json({success:true})

}
const reset1_passwordController=async(req,res)=>{

    try{
        const {userid,password,confirmPassword}=req.body;
       
        
  console.log("reset password")
  const User=await userModel.findOne({_id:userid});
        if(!User){
            console.log("1")
            res.status(200).json({success:true,
                msg:"User does not exit!!"
            })
        }
        else{
            if(confirmPassword!=password){
                console.log("2")
                res.status(200).json({success:true,
                    msg:"Confirm-password and the Password are different !!"
                })
            }
            else{
                console.log(3)
                const salt = await bcrypt.genSalt(10)
                const hashedPassword =await bcrypt.hash(password,salt)
                await userModel.updateOne({_id:userid},{$set:{
                    password:hashedPassword
                }})
                res.status(200).json({success:true,
                    msg:"Password-Reset Successfully"
                })
            }
        }

    }
    catch(error){
        console.log(error);
        res.status(400).json({success:false,msg:error.message})
    }
}
module.exports={loginController,reset1_passwordController,registerController,forgot_passwordController,reset_passwordController,change_passwordController

}