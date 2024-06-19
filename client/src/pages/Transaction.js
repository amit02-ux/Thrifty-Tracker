import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select,message,Table } from "antd";
import axios from "axios";
import Spinner from '../components/Spinner'

const Transaction = () => {
  const [loading,setLoading]=useState(false)
  const [showModal, setshowModal] = useState(false);
  const [transaction,setTransaction]=useState([]);
  const [Label,setLabel]=useState("Payied to");
  const [type,setType]=useState("Expences");
  const handleSelectChange=(value)=>{
    if(value=="income")
      setLabel("Paid-by");
    else
    setLabel("Paid-to")
    console.log(Label)

  }
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      
    },
    {
      title: 'Name',
      dataIndex: 'name',
      
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      
    },
   
    {
      title: 'Type',
      dataIndex: 'type',
      
    },
    {
      title: 'Category',
      dataIndex: 'category',
      
    },
    {
      title: 'Mode-of-transaction',
      dataIndex: 'mode',
      
    },
    {
      title: 'References',
      dataIndex: 'references',
      
    },
    {
      title: 'Description',
      dataIndex: 'description',
      
    },
   
   
    {
      
      title:'Action',
        dataIndex:'action',
        render:(text,record) =>(
          <div className='d-flex'>
           <button className="btn btn-primary ml-2 ml-2" onClick={getAlltransaction}>GET</button>
           <button className="btn btn-danger ml-2 mr-2" onClick={getAlltransaction}>delete</button>
          </div>
        )
      
    },
    
  ];
  const getAlltransaction=async()=>{
    try{
      const user=JSON.parse(localStorage.getItem('user'));
      const r =await axios.post('/transactions/get_transaction',{userid:user._id})
      console.log(r.data);
      setTransaction(r.data);


    }
    catch(error){
      console.log(error);
      message.error("getting failed")

    }
  }
  useEffect(()=>{
    getAlltransaction();


  },[])
  const HandleSubmit = async(values) => {
    try{
      const user=JSON.parse(localStorage.getItem('user'));
      // console.log(user)
      setLoading(true);
    
      
      await axios.post("/transactions/Add_tran",{userid:user._id,...values})
      // const {data}=await axios.post("/users/login",values)
      setLoading(false);
     
    
      message.success("Transaction added successfully")
      setshowModal(false);


    }
    catch(error){
      setLoading(false);
      console.log("amit vishwakarma")
      message.error("Add transaction failed")

    }
  };
  return (
    <>
      <div>
      {loading&&<Spinner/>}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Transactions
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Track_of_expences
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Weekly
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Monthly
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Annualy
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Custom
                      </a>
                    </li>
                   
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Income
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Expences
                      </a>
                    </li>
                    
                  </ul>
                </li>
              </ul>
              <div className="search mr-2">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div>
                {/* <button type="button" className="btn btn-success ml-2px">add_transaction</button> */}
                <button
                  type="button"
                  className="btn btn-success ml-3 mr-2"
                  onClick={() => setshowModal(true)}
                >
                  add_transaction
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setshowModal(false)}
        footer={false}
      >
       
         <Form layout="vertical" onFinish={HandleSubmit}>
      <Form.Item
        label={Label}
        name="name" // Corrected spelling
        rules={[{ required: true, message: 'Please enter an name!' }]}
      >
        <Input type="text" placeholder="name" />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount" // Corrected spelling
        rules={[{ required: true, message: 'Please enter an amount!' }]}
      >
        <Input type="number" placeholder="amount" />
      </Form.Item>
      
      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please select a type!' }]}
        
      >
        <Select onChange={handleSelectChange}>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select>
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="project">Project</Select.Option>
          <Select.Option value="house-rent">House-Rent</Select.Option>
          <Select.Option value="trading">Trading</Select.Option>
          <Select.Option value="food">Food</Select.Option>
          <Select.Option value="fee">Fee</Select.Option>
          <Select.Option value="bill">Bill</Select.Option>
          <Select.Option value="shopping">Shopping</Select.Option>
          <Select.Option value="movie">Movie</Select.Option>
          <Select.Option value="medical">Medical</Select.Option>
          <Select.Option value="tax">Tax</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        label="Mode of Transaction"
        name="mode"
        rules={[{ required: true, message: 'Please select a mode!' }]}
      >
        <Select>
          <Select.Option value="cash">Cash</Select.Option>
          <Select.Option value="paytm">Paytm</Select.Option>
          <Select.Option value="phone-pay">Phone-Pay</Select.Option>
          <Select.Option value="google-pay">Google-pay</Select.Option>
          <Select.Option value="net-banking">Net-Banking</Select.Option>
          <Select.Option value="credit-card">Credit-card</Select.Option>
          <Select.Option value="debit-card">Debit-card</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        label="References"
        name="references"
        rules={[{ required: true, message: 'Please enter a reference!' }]}
      >
        <Input type="text" placeholder="references" />
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
      <button className="btn btn-primary " type="submit">
              ADD
            </button>
      </div>
    </Form>
      </Modal>
      <button className="btn btn-primary" onClick={getAlltransaction}>GET</button>
    
      <Table columns={columns} dataSource={transaction} />
 
    </>
  );
};

export default Transaction;
