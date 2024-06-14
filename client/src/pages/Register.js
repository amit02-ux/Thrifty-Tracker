import React,{useState} from 'react'
import {Form,Input,message} from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'
const Register = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false)
    const submitHandler=async(values)=>{
      try{
        setLoading(true)
        console.log("hello")
        await axios.post("/users/register",values)
        setLoading(false)
        message.success("Registration successful")
     
        navigate("/login")

      }
      catch(error){
        setLoading(false)
        // console.log("hello");

        message.error("Something went wrong");

      }


    }
  return (
   <>
   <div className='register_page'>
    {loading&&<Spinner/>}
 <Form Layout='vertical' onFinish={submitHandler}>
    <h1>Register Page</h1>
    <Form.Item label="Name" name="name">
  <Input type="text"  placeholder="name"required/>
</Form.Item>
<Form.Item label="Email" name="email">
  <Input type="email"  placeholder="email"required/>
</Form.Item>
<Form.Item label="Password" name="password">
  <Input type="password" placeholder="password"required/>
</Form.Item>
    <div className='d-flex justify-content-between'> 
        <Link to='/login'>Already register? Click here to login</Link>
        <button className='btn btn-primary'>Register</button>
    </div>
 </Form>
   </div>
   </>
  )
}

export default Register