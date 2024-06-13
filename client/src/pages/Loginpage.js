import React from 'react'

import {Form,Input} from 'antd'
import { Link } from 'react-router-dom'

const Loginpage = () => {
    const submitHandler=(values)=>{
        console.log(values);
        // console.log(values.email);

    }
  return (
    <>
    <div className='login_page'>
  <Form Layout='vertical' onFinish={submitHandler}>
     <h1>Login Page</h1>
    
     <Form.Item label="Email" name="email">
         <Input type='email'/>
     </Form.Item>
     <Form.Item label="Password" name="password">
         <Input type='password'/>
     </Form.Item>
     <div className='d-flex justify-content-between'> 
         <Link to='/register'>If not  registered? Click here to register</Link>
         <button className='btn btn-primary'>Login</button>
     </div>
  </Form>
    </div>
    </>
  )
}

export default Loginpage