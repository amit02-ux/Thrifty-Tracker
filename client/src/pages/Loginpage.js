import React,{useState,useEffect} from 'react'

import {Form,Input,message,Modal} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

import Spinner from '../components/Spinner'

const Loginpage = () => {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false)
  const [forgot,setForgot]=useState(false)
    const submitHandler=async(values)=>{
        // console.log(values);
        // console.log(values.email);
        try{
          setLoading(true)
          const {data}=await axios.post("/users/login",values)
          setLoading(false)
          message.success("Login successfully")
          console.log("Amit is login successfully")
          // console.log(data);
          // console.log(data.password)
          // console.log(values.email);
   
          // localStorage.setItem('user',JSON.stringify(dt));
          localStorage.setItem('user', JSON.stringify({...data.user, password: ''}))

         
          // console.log(dt)
      
          // message.success("Logout successfully")
          const myTimeout = setTimeout(() => {
            navigate('/')
        }, 400); 


        }
        catch(error){
          setLoading(false)
          message.error("Something went wrong");
        }

    }
    useEffect(()=>{
      if(localStorage.getItem("user")){
        navigate('/');
      }

    },[navigate])
    const Handleforgot_password=async(values)=>{
      try{
        console.log(values);
   await axios.post("/users/forgot_password",values)

   message.success("Reset-password successfully")
          console.log("Amit is login successfully")
          setForgot(false)

      }
      catch(error){
        console.log(error);
        message.status(400).send(error);
        
      }

    }
  return (
    <>
    <div className='login_page'>
      {loading&&<Spinner/>}
  <Form Layout='vertical' onFinish={submitHandler}>
     <h1>Login Page</h1>
    
     {/* <Form.Item label="Email" name="email">
         <Input type='email' placeholder="email"/>
     </Form.Item>
     <Form.Item label="Password" name="password">

     <Input type="password" placeholder="password"required/>
     </Form.Item>
     <div className='d-flex justify-content-between'> 
         <Link to='/register'>If not  registered? Click here to register</Link>
         <button className='btn btn-primary'>Login</button>
     </div> */}
     <Form.Item label="Email" name="email">
  <Input type="email"  placeholder="email"   rules={[{ required: true, message: 'Please enter a reference!' }]}/>
</Form.Item>
<Form.Item label="Password" name="password">
  <Input type="password" placeholder="password"  rules={[{ required: true, message: 'Please enter a password!' }]}/>
</Form.Item>
<div>
<Link to="/register" className="m-4" color='black' onClick={()=>{setForgot(true)}}>You have to resister first</Link>
<Link to="/login" className="m-4" color='black' onClick={()=>{setForgot(true)}}>Forgot_password</Link>
<button className="btn btn-primary" type="submit">
  Login
</button>
</div>
  </Form>
  
    </div>
    <Modal title="Forgot-Password" open={forgot}     footer={false} onCancel={()=>{setForgot(false)}}>
      <Form onFinish={Handleforgot_password}>
          <p>Enter the your email,we'll send you a link to reset your password</p>
      <Form.Item
        label="Email"
        name="email" // Corrected spelling
        rules={[{ required: true, message: 'Please enter an email!' }]}
      >
      
        <Input type="email" placeholder="Email" />
      </Form.Item>
      <div className="d-flex justify-content-end">
      <button className="btn btn-primary " type="submit" >
              Submit
            </button>
      </div>
      
      </Form>
       
       </Modal>
    </>
  )
}

export default Loginpage