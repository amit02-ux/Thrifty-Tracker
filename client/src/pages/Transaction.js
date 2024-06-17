import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select,message } from "antd";
import axios from "axios";
import Spinner from '../components/Spinner'

const Transaction = (values) => {
  const [loading,setLoading]=useState(false)
  const [showModal, setshowModal] = useState(false);
  const HandleSubmit = async(values) => {
    try{
      const user=JSON.parse(localStorage.getItem('user'));
      console.log(user)
      setLoading(true);
      await axios.post("/transactions/Add_tran",{userid:user._id,...values})
      
      setLoading(false);
    
      message.success("Transaction added successfully")
      setshowModal(false);


    }
    catch(error){
      setLoading(false);
      console.log("amit vishwakarma")
      message.error("gkjkljckd")

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
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Annualy
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
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
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
        <Form Layout="vertical" onFinish={HandleSubmit}>
          <Form.Item label="Amount" name="amout">
            <Input type="text" placeholder="amount" required />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option values="income">Income</Select.Option>
              <Select.Option values="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option values="salary">Salary</Select.Option>
              <Select.Option values="project">Project</Select.Option>
              <Select.Option values="house-rent">House-Rent</Select.Option>
              <Select.Option values="trading">Trading</Select.Option>
              <Select.Option values="food">Food</Select.Option>
              <Select.Option values="fee">Fee</Select.Option>
              <Select.Option values="bill">Bill</Select.Option>
              <Select.Option values="shopping">Shopping</Select.Option>
              <Select.Option values="movie">Movie</Select.Option>
              <Select.Option values="medical">Medical</Select.Option>
              <Select.Option values="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Mode-of-transaction" name="mode">
            <Select>
              <Select.Option values="cash">Cash</Select.Option>
              <Select.Option values="paytm">Paytm</Select.Option>
              <Select.Option values="phone-pay">Phone-Pay</Select.Option>
              <Select.Option values="google-pay">Google-pay</Select.Option>
              <Select.Option values="net-banking">Net-Banking</Select.Option>
              <Select.Option values="credit-card">Credit-card</Select.Option>
              <Select.Option values="debit-card">Debit-card</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="References" name="references">
            <Input type="text" placeholder="references" required />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" placeholder="description" required />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" placeholder="date" required />
          </Form.Item>
          <Form.Item label="Time" name="time">
            <Input type="time" placeholder="time" required />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary " type="submit">
              ADD
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Transaction;
