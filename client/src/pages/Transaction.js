import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select,message,Table ,DatePicker,Space} from "antd";
import axios from "axios";
import Spinner from '../components/Spinner'
import moment from "moment";
import { EditTwoTone ,EditOutlined,FormOutlined,DeleteOutlined  } from '@ant-design/icons';

const {RangePicker}=DatePicker

const Transaction = () => {
  const [loading,setLoading]=useState(false)
  const [showModal, setshowModal] = useState(false);
  const[add,setAdd]=useState(false)
  const [transaction,setTransaction]=useState([]);
  const [Label,setLabel]=useState("Payied to");
  const [type,setType]=useState("All");
  const [frequency,setFrequency]=useState('7');
  const [selecteddate,setSelecteddate]=useState([null,null])
  const [sortedInfo, setSortedInfo] = useState({});
  const [edit,setEdit]=useState(null)
  const [delet,setDelete]=useState(false)
  const [searchInput, setSearchInput] = useState('');
  const [Search,setSearch]=useState(false)
  
  const deleteHandler=async(value)=>{
  const transactionId =value;
  // console.log(value)
  setLoading(true);
  setDelete(true)
  try{
    if(!transactionId){
      message.error("Transaction not found");
      setLoading(false);
      setDelete(false)
    }
    else{
      const det = await axios.post('/transactions/delet_transaction',{transactionId})
     

      if(det){
        message.success("Deleted successfully")
      }
      else{
        message.error("Something wrong with deletation")
      }
      setLoading(false);
      setDelete(false)
    }
  }
 catch(error){
  setLoading(false)
  setDelete(false)
  console.log(error)
  message.status(400).send("Deletation failed")
 }
  }
 
  const handleSelectChange=async(value)=>{
    setType(value)
    if(type=="income")
      setLabel("Paid-by");
    else
    setLabel("Paid-to")
    console.log(Label)

  }
  const columns = [
    {
     
      title: 'Date',
      dataIndex: 'date',
      key:'date',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ['ascend', 'descend'],
      
      
      render:(text,record) =>(
        <span>{moment(text).format('YYYY-MM-DD')}</span>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key:'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      
      
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['ascend', 'descend'],
      
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
       
           <button className="btn btn-primary  custom-margin"  onClick={()=>{setEdit(record);setshowModal(true)}}><FormOutlined/></button>
           <button className="btn btn-danger  custom-margin" onClick={()=>deleteHandler(record._id)}><DeleteOutlined/></button>
           
          </div>
        )
      
    },
    
  ];
  
  const getAlltransaction=async()=>{
    // console.log(edit)
    try{
      const user=JSON.parse(localStorage.getItem('user'));
      const r =await axios.post('/transactions/get_transaction',{userid:user._id,frequency,type,selecteddate})
      console.log(r.data);
      setTransaction(r.data);
      // setFrequency('365')

    }
    catch(error){
      console.log(error);
      message.error("getting failed")

    }
  }
  useEffect(()=>{
    getAlltransaction();


  },[add,frequency,type,selecteddate,edit,delet,Search])



//Handle for input change in search  
  const handleInputChange = async(event) => {
    console.log(event.target.value)
    setSearchInput(event.target.value);
  };
  //Seach handeler
  const searchHandle=async(event)=>{
    event.preventDefault();
    // event.preventDefault(); // Prevent default form submission
    // setSearch(true);
    setLoading(true)
    console.log('Search input:', searchInput)
    try{
      if(!searchInput){
        setSearch(false)
        setLoading(false)
        message.error("Fill the search criteria")
       
      }
      else{
      // await axios.post('/transactions/get_transaction',{searchInput})
      // getAlltransaction();
      setSearch(false)
      setLoading(false)

      }

    }
    catch(error){
      console.log(error);
      message.error("Searching Failed");

    }

    

  }
  const HandleSubmit = async(values) => {
    console.log(values)
    try{
      const user=JSON.parse(localStorage.getItem('user'));
      // console.log(user)
    
     if(edit){
      setLoading(true);
    
      
      await axios.post("/transactions/edit_transaction",{
        payload:{...values,
          userid:user._id
          
        },
        transactionsId:edit._id
      })
      // const {data}=await axios.post("/users/login",values)
      setLoading(false);
     
    

      message.success("Edit successfully")
      setshowModal(false);
      setEdit(null)

     }
     else{
      setLoading(true);
    
      
      await axios.post("/transactions/Add_tran",{userid:user._id,...values})
      // const {data}=await axios.post("/users/login",values)
      setLoading(false);
     
    
      message.success("Transaction added successfully")
      setshowModal(false);
      setAdd(true)

     }

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
                      <a className="dropdown-item" href="#"
                      onClick={()=>setFrequency('7')}
                      >
                      Last 1  Week
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#"
                        onClick={()=>setFrequency('30')}>
                     Last 1  Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#"
                        onClick={()=>setFrequency('365')}
                      >
                       Last 1 Year
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={()=>setFrequency('custom')} >
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
                    Type
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#"
                        onClick={()=>setType('All')}>
                        All
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#"
                        onClick={()=>setType('income')}>
                      
                        Income
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#"
                        onClick={()=>setType('expense')}
                      >
                        Expences
                      </a>
                    </li>
                    
                  </ul>
                </li>
              </ul>
             <span>
             {frequency==='custom'&&<RangePicker value={selecteddate} onChange={(values)=>setSelecteddate(values)}/>}
             </span>
              <div className="search mr-2">
                <form className="d-flex" role="search" onSubmit={searchHandle}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleInputChange}
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
        title={edit?"Edit-Transaction":"Add-transaction"}
        open={showModal}
        onCancel={() => {setEdit(null);setshowModal(false);}}
        footer={false}
      >
        
       
         <Form layout="vertical" onFinish={HandleSubmit} initialValues={edit}>
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
      <button className="btn btn-primary " type="submit" >
              ADD
            </button>
      </div>
    </Form>
      </Modal>
      {/* <button className="btn btn-primary" onClick={getAlltransaction}>GET</button>
     */}
      <Table columns={columns} dataSource={transaction}  sortedInfo={sortedInfo} />
 
    </>
  );
};

export default Transaction;
