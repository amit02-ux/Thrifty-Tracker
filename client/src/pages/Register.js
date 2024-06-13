import React from 'react'
import {Form,Input} from 'antd'
import { Link } from 'react-router-dom'

const Register = () => {
    const submitHandler=(values)=>{
        console.log(values);


    }
  return (
   <>
   <div className='register_page'>
 <Form Layout='vertical' onFinish={submitHandler}>
    <h1>Register Page</h1>
    <Form.Item label="Name" name="name">
        <Input type='name'/>
    </Form.Item>
    <Form.Item label="Email" name="email">
        <Input type='email'/>
    </Form.Item>
    <Form.Item label="Password" name="password">
        <Input type='password'/>
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