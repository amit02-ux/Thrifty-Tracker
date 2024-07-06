
// import React, { useState,useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Modal, Form, Input ,Table} from "antd";
// import moment from "moment";

// import { HomeOutlined, DollarOutlined, CalendarOutlined, LockOutlined, PieChartOutlined,ExclamationCircleOutlined ,DeleteOutlined} from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, Button, theme, message } from 'antd';
// import axios from 'axios';

// const { Header, Content, Sider } = Layout;

// const Homepage = () => {
//   const navigate = useNavigate();
//   const [resetPassword, setResetPassword] = useState(false);
//   const [addDue,setAddDue]=useState(false);
//   const [dateover,setDateover]=useState(false);
//   const [duetransaction,setDuetransaction]=useState([])
//   const [form] = Form.useForm();
//   const [dueDelete,setDueDelete]=useState(false)
//   const columns = [
//     {
     
//       title: 'Date',
//       dataIndex: 'date',
//       key:'date',
//       defaultSortOrder: 'ascend',
    
      
      
//       sorter: (a, b) => new Date(a.date) - new Date(b.date),
//       sortDirections: ['ascend', 'descend'],
      
      
//       render:(text,record) =>(
//         <span>{moment(text).format('YYYY-MM-DD')}</span>
//       )
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
      
      
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key:'name',
     
      
//     },
   
   
//     {
//       title: 'Email',
//       dataIndex: 'email',
      
//     },
   
  
  
//     {
//       title: 'Description',
//       dataIndex: 'description',
      
//     },
   
   
//     {
      
//       title:'Action',
//         dataIndex:'action',
//         render:(text,record) =>(
//           <div className='d-flex'>
   
//            <button className="btn btn-danger  custom-margin" onClick={()=>{deleteHandler(record._id);setDueDelete(true)}}><DeleteOutlined/></button>
           
//           </div>
//         )
      
//     },
    
//   ];
//   const getDue_transaction=async()=>{
//     try{
//       const user=JSON.parse(localStorage.getItem('user'));
//       const response=await axios.post("/transactions/get_due_transaction",{userid:user._id})
//       if(dateover){
//         const currentDate = new Date();
  
//         const res1=response.data.filter(duetransaction=>new Date(duetransaction.date)<currentDate)
//         console.log(res1)
//         setDuetransaction(res1);
//       }
//      else{
//       const res1=response.data;
//       console.log(res1)
//       setDuetransaction(res1);
     
//      }



//     }
//     catch(error){
//       console.log(error);
//       message.error("Some thing wrong with getting the due_transaction")
//     }

//   }

//   const logoutHandler = () => {
//     console.log("Hijhjknkndf");
//     localStorage.removeItem('user');
//     message.success("Logout successfully");
//     setTimeout(() => {
//       navigate('/login');
//     }, 400);
//   };
//   const Due_Transaction=async(values)=>{
//    try{
//     const user=JSON.parse(localStorage.getItem('user'));
//     await axios.post("/transactions/add_due_transaction",{userid:user._id,...values})
//     setAddDue(false)
//     message.success("Due_transaction add successfully")


//    }
//    catch(error){
//     console.log(error);
//     message.error("Some-thing wrong with adding the due transaction")
//    }



//   }
//   useEffect(()=>{
//     getDue_transaction();


//   },[dateover,addDue,dueDelete])
//   const deleteHandler=async(value)=>{
//    try{
//     const due_id=value;
//     if(!due_id){
//       message.error("NO such transaction exit")

//     }
//     else{
//       const det = await axios.post('/transactions/deletdue_transaction',{due_id})
//       setDueDelete(false)
     

//       if(det){
//         message.success("Deleted successfully")
//       }
//       else{
//         message.error("Something wrong with deletation")
//       }
      
//     }
//    }
//    catch(error){
//     console.log(error)
//     message.error("Deletation failed")
//    }

//   }
// const submitHandler=async(values)=>{
//   console.log(values)


// try{
//   const user=JSON.parse(localStorage.getItem('user'));
// //   const email=user.email;
//   console.log(user);
//   const email=user.email;
//   await axios.post('/users/reset1_password',{...values,email})
//   setResetPassword(false)
//   localStorage.removeItem('user');
 
//   setTimeout(() => {
//     navigate('/login');
//   }, 400);

//   message.success("Password-Reset successfully")

// }
// catch(error){
//   console.log(error)
//   message.error("Some thing went wrong!")
// }
// }
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const items2 = [
//     {
//       key: '1',
//       icon: React.createElement(DollarOutlined),
//       label: <Link className="nav-link active" to="/transactions">Transactions</Link>
//     },
//     {
//       key: '2',
//       icon: React.createElement(CalendarOutlined),
//       label:  <Link className="nav-link active" onClick={() => setAddDue(true)}>Add-Due-Transaction</Link>
//     },
   
//     {
//       key: '3',
//       icon: React.createElement(LockOutlined),
//       label: <Link className="nav-link active" onClick={() => setResetPassword(true)}>Reset Password</Link>
//     },
//   ];

//   return (
//     <>
//       <Layout style={{ minHeight: '100vh' }}>
//         <Header
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <HomeOutlined style={{ fontSize: '24px', color: 'white', marginRight: '16px' }} />
//           <Button type="primary" style={{ marginLeft: 'auto' }} onClick={logoutHandler}>Logout</Button>
//         </Header>
//         <Layout>
//           <Sider
//             style={{
//               background: colorBgContainer,
//             }}
//             width={200}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '16px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               }}
//             >
//               <PieChartOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
//               Thrifty-Tracker
//             </div>
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={['1']}
//               style={{
//                 height: '100%',
//               }}
//               items={items2}
//             />
//           </Sider>
//           <Content
//             style={{
//               padding: '0 24px',
//               minHeight: 280,
//             }}
//           >
//             <Breadcrumb
//               style={{
//                 margin: '16px 0',
//               }}
//             >
//               <Breadcrumb.Item> <Link className="nav-link active" onClick={() => setDateover(false)}>Due-Transaction</Link></Breadcrumb.Item>
//               <Breadcrumb.Item> <Link className="nav-link active" onClick={() => setDateover(true)}>Over-Due-Transaction</Link></Breadcrumb.Item>
//             </Breadcrumb>
//             <div
//               style={{
//                 padding: '24px',
//                 background: colorBgContainer,
//                 borderRadius: borderRadiusLG,
//               }}
//             >
//               <Table columns={columns} dataSource={duetransaction}   />
           
//             </div>
//           </Content>
//         </Layout>
//       </Layout>
//       <Modal
//        title={<div style={{ textAlign: 'center', width: '100%' }}>Add-Due-Transaction</div>}
//         open={addDue}
       
//         onCancel={() => setAddDue(false)}
      
//         footer={false}
//       >
       
//           <Form layout="vertical" onFinish={Due_Transaction} style={{ width: '400px', padding: '20px'}}>
//       <Form.Item
//       label="Name"
//         name="name" // Corrected spelling
//         rules={[{ required: true, message: 'Please enter an name!' }]}
//       >
//         <Input type="text" placeholder="name" />
//       </Form.Item>
//       <Form.Item
//       label="Email"
//         name="email" // Corrected spelling
//         rules={[{ required: true, message: 'Please enter an name!' }]}
//       >
//         <Input type="text" placeholder="name" />
//       </Form.Item>
//       <Form.Item
//         label="Amount"
//         name="amount" // Corrected spelling
//         rules={[{ required: true, message: 'Please enter an amount!' }]}
//       >
//         <Input type="number" placeholder="amount" />
//       </Form.Item>
      
      
    
      
//       <Form.Item
//         label="Description"
//         name="description"
//         rules={[{ required: true, message: 'Please enter a reference!' }]}
//       >
//         <Input type="text" placeholder="description" />
//       </Form.Item>
      
     
      
//       <Form.Item
//         label="Date"
//         name="date"
//         rules={[{ required: true, message: 'Please select a date!' }]}
//       >
//         <Input type="date" placeholder="date" />
//       </Form.Item>
      
    
//       <div className="d-flex justify-content-end">
//       <button className="btn btn-primary " type="submit" >
//               ADD
//             </button>
//       </div>
//     </Form>
//       </Modal>
//       <Modal
//        title={<div style={{ textAlign: 'center', width: '100%' }}>Reset Password</div>}
//         open={resetPassword}
       
//         onCancel={() => setResetPassword(false)}
      
//         footer={false}
//       >
//         <Form 
//          form={form} layout="vertical"  className="login-form" onFinish={submitHandler} initialValues={""}style={{ width: '400px', padding: '20px'}}>
//           <Form.Item
//             label="New Password"
//             name="password"
            
//             rules={[{ required: true, message: 'Please input your new password!' }]}
//           >
//             <Input.Password  />
//           </Form.Item>
//           <Form.Item
//             label="Confirm Password"
//             name="confirmPassword"
//             rules={[{ required: true, message: 'Please confirm your new password!' }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <div className="d-flex justify-content-end">
//       <button className="btn btn-primary " type="submit" >
//               ADD
//             </button>
//       </div>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Homepage;
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

  const getDue_transaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post("/transactions/get_due_transaction", { userid: user._id });
      if (dateover) {
        const currentDate = new Date();
        const res1 = response.data.filter(duetransaction => new Date(duetransaction.date) < currentDate);
        console.log(res1);
        setDuetransaction(res1);
      } else {
        const res1 = response.data;
        console.log(res1);
        setDuetransaction(res1);
      }
    } catch (error) {
      console.log(error);
      message.error("Some thing wrong with getting the due_transaction");
    }
  };

  const logoutHandler = () => {
    console.log("Hijhjknkndf");
    localStorage.removeItem('user');
    message.success("Logout successfully");
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };

  const Due_Transaction = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post("/transactions/add_due_transaction", { userid: user._id, ...values });
      setAddDue(false);
      message.success("Due_transaction add successfully");
    } catch (error) {
      console.log(error);
      message.error("Some-thing wrong with adding the due transaction");
    }
  };

  useEffect(() => {
    getDue_transaction();
  }, [dateover, addDue, dueDelete]);

  const deleteHandler = async (value) => {
    try {
      const due_id = value;
      if (!due_id) {
        message.error("NO such transaction exit");
      } else {
        const det = await axios.post('/transactions/deletdue_transaction', { due_id });
        setDueDelete(false);
        if (det) {
          message.success("Deleted successfully");
        } else {
          message.error("Something wrong with deletation");
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Deletation failed");
    }
  };

  const submitHandler = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user.email;
      await axios.post('/users/reset1_password', { ...values, email });
      setResetPassword(false);
      localStorage.removeItem('user');
      setTimeout(() => {
        navigate('/login');
      }, 400);
      message.success("Password-Reset successfully");
    } catch (error) {
      console.log(error);
      message.error("Some thing went wrong!");
    }
  };

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
      label: <Link className="nav-link active" onClick={() => setAddDue(true)}>Add-Due-Transaction</Link>
    },
    {
      key: '3',
      icon: React.createElement(LockOutlined),
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
        Thrifty-Tracker
      </div>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }} items={items2} />
    </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
             
            <Breadcrumb.Item>
        <Link className="nav-link active" onClick={() => setDateover(false)} style={{ color: textColor }}>
          Due-Transaction
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link className="nav-link active" onClick={() => setDateover(true)} style={{ color: textColor }}>
          Over-Due-Transaction
        </Link>
      </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: '24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
              <div className="table-responsive">
                <table className="table  table-striped">
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
                          <button className="btn btn-danger" onClick={() => { deleteHandler(transaction._id); setDueDelete(true); }}>
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
        title={<div style={{ textAlign: 'center', width: '100%' }}>Add-Due-Transaction</div>}
        open={addDue}
        onCancel={() => setAddDue(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={Due_Transaction} style={{ width: '400px', padding: '20px' }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a name!' }]}
          >
            <Input type="text" placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter an email!' }]}
          >
            <Input type="text" placeholder="email" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter an amount!' }]}
          >
            <Input type="number" placeholder="amount" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description!' }]}
          >
            <Input type="text" placeholder="description" />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <Input type="date" placeholder="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              ADD
            </button>
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
          className="login-form"
          onFinish={submitHandler}
          initialValues={""}
          style={{ width: '400px', padding: '20px' }}
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              ADD
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Homepage;
