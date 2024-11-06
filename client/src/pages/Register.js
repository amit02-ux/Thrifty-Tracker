import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'

const Register = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false)
    const submitHandler=async(values)=>{
      try{
        const {name,password}=values;
     
        console.log(password)
     if(password.length<8){
      message.error("Password should be of atleat 8 character")
      return ;
     }
        setLoading(true)
        console.log("hello")
     const res=   await axios.post("/users/register",values)
        setLoading(false)
        // console.log(res.data.msg)
        message.success(res.data.msg );
     
        navigate("/login")

      }
      catch(error){
        setLoading(false)
        // console.log("hello");

        message.error("Something went wrong");

      }


    }
    useEffect(()=>{
      if(localStorage.getItem("user")){
        navigate('/');
      }

    },[navigate])
  return (
   <>
   <div className='register_page'>
    {loading&&<Spinner/>}
    <Form layout="vertical"  className="register-form" onFinish={submitHandler} style={{ width: '400px', padding: '20px' }}>
    <h2 className="text-center" style={{ color: 'white' }}>Register</h2>

    <Form.Item label={<span style={{ color: 'white', fontSize: '20px' }}>Name</span>} name="name">
  <Input type="text"  placeholder="name"   style={{ border: '2px solid black' }} rules={[{ required: true, message: 'Please enter a name!' }]}/>
</Form.Item>
<Form.Item label={<span style={{ color: 'white', fontSize: '20px' }}>Email</span>} name="email">
  <Input type="email"  placeholder="email" style={{ border: '2px solid black' }}  rules={[{ required: true, message: 'Please enter a email!' }]}/>
</Form.Item>
<Form.Item label={<span style={{ color: 'white', fontSize: '20px' }}>Password</span>} name="password">
  <Input type="password" placeholder="password" style={{ border: '2px solid black' }}  rules={[{ required: true, message: 'Please enter a password!' }]}/>
</Form.Item>
   
       <div  style={{ textAlign: 'center' }}>
       <Link to='/login' style={{ color: 'white', fontSize: '20px' }}>
  Already register? Click here to login
</Link>
        
   
        <div className="d-flex align-items-center w-150">
      <hr className="flex-grow-1" style={{ borderColor: 'white', borderWidth: '3px' }} />
      <span className="px-2" style={{ fontSize: '1.50rem', color:'white'}}>or</span>
      <hr className="flex-grow-1" style={{ borderColor: 'white', borderWidth: '3px' }} />
    </div>
    <button className="btn btn-primary mt-2" type="submit" style={{ fontSize: '20px', padding: '8px 30px' }} >
        Register
      </button>
       </div>
 </Form>
   </div>
   </>
  )
}

export default Register