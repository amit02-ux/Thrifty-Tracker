import React,{useState,useEffect} from 'react'

import {Form,Input,message,Modal,} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { GoogleOutlined ,GooglePlusOutlined} from '@ant-design/icons';
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
          // console.log(values);
          const res=await axios.post("/users/login",values)
          // window.location.reload();
          console.log(res)
          setLoading(false)
        
        //  const user=data.user;
         if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          // console.log("njknknf");
          navigate("/");
          message.success("successfully logged in");
        
        } else {
          message.error(res.data.message);
        }
      
        }
        catch(error){
          setLoading(false)
          message.error("Something went wrong");
        }

    }
    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate('/');
      }

    },[navigate])
    const Handleforgot_password=async(values)=>{
      try{
        console.log(values);
   await axios.post("/users/forgot_password",values)
   window.location.reload();
   message.success("Reset password link has been send to your email")
          console.log("Amit is login successfully")
          setForgot(false)

      }
      catch(error){
        console.log(error);
        // message.status(400).send(error);
        
      }


    }
  return (
    <>
    <div className='login_page' >
      {loading&&<Spinner/>}
      <Form layout="vertical"  className="login-form" onFinish={submitHandler} style={{ width: '400px', padding: '20px'}} >
      <h2 className="text-center" style={{ color: 'white' }}>Login</h2>

    
    
      <Form.Item label={<span style={{ color: 'white', fontSize: '20px' }}>Email</span>} name="email">
  <Input type="email"  placeholder="email" style={{ border: '2px solid black' }}   rules={[{ required: true, message: 'Please enter a reference!' }]}/>
</Form.Item>
<Form.Item label={<span style={{ color: 'white', fontSize: '20px' }}>Password</span>} name="password">
  <Input type="password" placeholder="password" style={{ border: '2px solid black' }}   rules={[{ required: true, message: 'Please enter a password!' }]}/>
</Form.Item>
<div>
<div className="d-flex justify-content-between">
  <Link
    to="/register"
    style={{  fontSize: '30px' }}
    // style={{ color: 'black' }} 
  >
  <h6> Register</h6>
  </Link>
  <Link
    to="/login"
    // style={{ color: 'black' }} 
   onClick={() => setForgot(true)
    }
  >
   
   <h6> Forgot_password?</h6>
  </Link>
</div>

<div className="d-flex flex-column align-items-center">
  <button className="btn btn-primary mb-2" type="submit"  style={{ fontSize: '20px', padding: '8px 30px' }}>
    Login
  </button>
  
  
  
  
</div>
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
