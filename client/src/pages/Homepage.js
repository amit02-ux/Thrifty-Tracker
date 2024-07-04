
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Form, Input } from "antd";
import { HomeOutlined, DollarOutlined, CalendarOutlined, LockOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, theme, message } from 'antd';
import axios from 'axios';

const { Header, Content, Sider } = Layout;

const Homepage = () => {
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);
  const [form] = Form.useForm();

  const logoutHandler = () => {
    console.log("Hijhjknkndf");
    localStorage.removeItem('user');
    message.success("Logout successfully");
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };
const submitHandler=async(values)=>{
  console.log(values)


try{
  const user=JSON.parse(localStorage.getItem('user'));
//   const email=user.email;
  console.log(user);
  const email=user.email;
  await axios.post('/users/reset1_password',{...values,email})
  setResetPassword(false)
  localStorage.removeItem('user');
 
  setTimeout(() => {
    navigate('/login');
  }, 400);

  message.success("Password-Reset successfully")

}
catch(error){
  console.log(error)
  message.error("Some thing went wrong!")
}
}
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items2 = [
    {
      key: '1',
      icon: React.createElement(DollarOutlined),
      label: <Link className="nav-link active" to="/transactions">Transactions</Link>
    },
    {
      key: '2',
      icon: React.createElement(CalendarOutlined),
      label: 'Due Transaction',
    },
    {
      key: '3',
      icon: React.createElement(LockOutlined),
      label: <Link className="nav-link active" onClick={() => setResetPassword(true)}>Reset Password</Link>
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HomeOutlined style={{ fontSize: '24px', color: 'white', marginRight: '16px' }} />
          <Button type="primary" style={{ marginLeft: 'auto' }} onClick={logoutHandler}>Logout</Button>
        </Header>
        <Layout>
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              <PieChartOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
              Thrifty-Tracker
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: '24px',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Content
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modal
       title={<div style={{ textAlign: 'center', width: '100%' }}>Reset Password</div>}
        open={resetPassword}
       
        onCancel={() => setResetPassword(false)}
      
        footer={false}
      >
        <Form 
         form={form} layout="vertical"  className="login-form" onFinish={submitHandler} initialValues={""}style={{ width: '400px', padding: '20px'}}>
          <Form.Item
            label="New Password"
            name="password"
            
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password  />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="d-flex justify-content-end">
      <button className="btn btn-primary " type="submit" >
              ADD
            </button>
      </div>
        </Form>
      </Modal>
    </>
  );
};

export default Homepage;
