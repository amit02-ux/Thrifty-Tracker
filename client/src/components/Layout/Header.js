import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { message } from 'antd';

const Header = () => {
  const navigate=useNavigate()
  const logoutHandler=()=>{
    localStorage.removeItem('user');
    message.success("Logout successfully")
    const myTimeout = setTimeout(() => {
      navigate('/login');
  }, 400); 


  }
  const [loginUser,setLoginUser]=useState('')
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginUser(user)
    }

  },[])
  return (
   <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid 
  ">
    {/* <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <Link className="nav-link" to="/user">
          <p>{ loginUser&& loginUser.name}
            </p></Link>
        </li>
        <li className="nav-item">
         <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
        </li>
       
        
      </ul>
    </div>
  </div>
</nav>

   </>
  )
}

export default Header