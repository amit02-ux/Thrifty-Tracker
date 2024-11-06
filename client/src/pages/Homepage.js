
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Form, Input } from "antd";
import moment from "moment";
import { HomeOutlined, DollarOutlined, CalendarOutlined, LockOutlined, PieChartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, theme, message } from 'antd';
import axios from 'axios';

const { Header, Content, Sider } = Layout;

const Homepage = () => {
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);
  const [addDue, setAddDue] = useState(false);
  const [dateover, setDateover] = useState(false);
  const [duetransaction, setDuetransaction] = useState([]);
  const [form] = Form.useForm();
  const [dueDelete, setDueDelete] = useState(false);

  const getDueTransaction = async () => {
    try {
      const response = await axios.post("/api/v1/transactions/get_due_transaction", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const currentDate = new Date();
      const filteredTransactions = dateover 
        ? response.data.filter(transaction => new Date(transaction.date) < currentDate)
        : response.data;

      setDuetransaction(filteredTransactions);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while fetching due transactions");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    message.success("Logged out successfully");
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };

  const addDueTransaction = async (values) => {
    try {
      await axios.post("/transactions/add_due_transaction", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAddDue(false);
      message.success("Due transaction added successfully");
      getDueTransaction(); // Refresh the transaction list
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while adding the due transaction");
    }
  };

  useEffect(() => {
    getDueTransaction();
  }, [dateover, addDue, dueDelete]);

  const deleteHandler = async (due_id) => {
    try {
      if (!due_id) {
        message.error("No such transaction exists");
        return;
      }
      await axios.post('/transactions/deletdue_transaction', { due_id },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDueDelete(false);
      message.success("Deleted successfully");
      getDueTransaction(); // Refresh the transaction list
    } catch (error) {
      console.log(error);
      message.error("Deletion failed");
    }
  };

  const submitHandler = async (values) => {
    try {
     
      await axios.post('/users/reset1_password', { ...values },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setResetPassword(false);
      localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/login');
      }, 400);
      message.success("Password reset successfully");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '1',
      icon: <DollarOutlined />,
      label: <Link className="nav-link active" to="/transactions">Transactions</Link>
    },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: <Link className="nav-link active" onClick={() => setAddDue(true)}>Add Due Transaction</Link>
    },
    {
      key: '3',
      icon: <LockOutlined />,
      label: <Link className="nav-link active" onClick={() => setResetPassword(true)}>Reset Password</Link>
    },
  ];

  const colorBgSidebar = '#283593';
  const textColor = '#283593';

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <HomeOutlined style={{ fontSize: '24px', color: 'white', marginRight: '16px' }} />
          <Button type="primary" style={{ marginLeft: 'auto' }} onClick={logoutHandler}>Logout</Button>
        </Header>
        <Layout>
          <Sider style={{ background: colorBgSidebar, color: 'white' }} width={200}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px', fontSize: '16px', fontWeight: 'bold' }}>
              <PieChartOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
              Thrifty Tracker
            </div>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }} items={menuItems} />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <Link className="nav-link active" onClick={() => setDateover(false)} style={{ color: textColor }}>
                  Due Transactions
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link className="nav-link active" onClick={() => setDateover(true)} style={{ color: textColor }}>
                  Overdue Transactions
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: '24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {duetransaction.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.email}</td>
                        <td>{transaction.description}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => deleteHandler(transaction._id)}>
                            <DeleteOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      <Modal
        title={<div style={{ textAlign: 'center', width: '100%' }}>Add Due Transaction</div>}
        open={addDue}
        onCancel={() => setAddDue(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={addDueTransaction} style={{ width: '400px', padding: '20px' }}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name!' }]}>
            <Input type="text" placeholder="name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter an email!' }]}>
            <Input type="email" placeholder="email" />
          </Form.Item>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter an amount!' }]}>
            <Input type="number" placeholder="amount" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description!' }]}>
            <Input type="text" placeholder="description" />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
            <Input type="date" placeholder="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">ADD</button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={<div style={{ textAlign: 'center', width: '100%' }}>Reset Password</div>}
        open={resetPassword}
        onCancel={() => setResetPassword(false)}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={submitHandler}
          style={{ width: '400px', padding: '20px' }}
        >
          <Form.Item label="New Password" name="password" rules={[{ required: true, message: 'Please input your new password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your new password!' }]}>
            <Input.Password />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">Reset Password</button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Homepage;
